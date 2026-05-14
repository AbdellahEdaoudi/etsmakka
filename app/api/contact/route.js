import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '../config/db';

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  subject: { type: String, required: true, maxLength: 200 },
  message: { type: String, required: true, maxLength: 2000 },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);

const ratelimit = new Map();

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    const now = Date.now();
    const lastRequest = ratelimit.get(ip) || 0;

    if (now - lastRequest < 10000) {
      return NextResponse.json({ success: false, message: 'Too many requests' }, { status: 429 });
    }
    ratelimit.set(ip, now);

    const data = await request.json();

    if (data.website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    await dbConnect();
    const newMessage = await Message.create({
      name: data.name.substring(0, 100),
      email: data.email.substring(0, 100),
      subject: data.subject?.substring(0, 200) || 'No Subject',
      message: data.message.substring(0, 2000)
    });

    return NextResponse.json({ success: true, id: newMessage._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
