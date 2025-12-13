const fs = require('fs');
const path = require('path');

const translations = {
    ar: {
        meta: {
            title: "مؤسسة مكة المكرمة للتربية والتعليم الأولي",
            description: "مؤسسة مكة المكرمة توفر بيئة تعليمية متميزة للأطفال في العيون. برامج تعليمية حديثة للتمهيدي والروض.",
            keywords: "روضة, تعليم أولي, العيون, مؤسسة مكة, تمهيدي, أطفال, تربية"
        },
        header: {
            title: "مؤسسة مكة المكرمة",
            subtitle: "للتربية والتعليم الأولي",
            nav: { about: "من نحن", programs: "البرامج", contact: "تواصل معنا" }
        },
        hero: {
            badge: "بيئة تعليمية متميزة",
            title_1: "مستقبل مشرق",
            title_2: "لأطفالكم",
            description: "نوفر بيئة تربوية آمنة ومحفزة تساعد على تنمية مهارات الأطفال الأساسية من خلال برامج تعليمية حديثة ومتطورة",
            cta_contact: "تواصل معنا",
            cta_programs: "اكتشف برامجنا",
            image_alt: "أطفال سعداء في الروضة"
        },
        stats: {
            satisfaction: "رضا أولياء الأمور",
            graduates: "طفل متخرج",
            experience: "سنوات من الخبرة"
        },
        about: {
            title: "من نحن",
            p1: "مؤسسة مكة المكرمة للتربية والتعليم الأولي هي مؤسسة تعليمية رائدة في مدينة العيون، تأسست بهدف توفير تعليم نوعي للأطفال في مرحلة ما قبل المدرسة.",
            p2: "نؤمن بأن السنوات الأولى من حياة الطفل هي الأساس لبناء شخصيته ومستقبله، لذلك نحرص على توفير بيئة تعليمية آمنة ومحفزة تساعد على تنمية مهاراته الأساسية."
        },
        programs: {
            title: "برامج المؤسسة",
            subtitle: "برامج تعليمية متكاملة لجميع المراحل العمرية",
            items: [
                { title: "التمهيدي الثاني", description: "إعداد شامل للمرحلة الابتدائية للأطفال من 5-6 سنوات", icon: "🎓" },
                { title: "التمهيدي الأول", description: "تطوير المهارات الأساسية للأطفال من 4-5 سنوات", icon: "📚" },
                { title: "الروض", description: "برنامج تعليمي متكامل للأطفال من 3-4 سنوات", icon: "🌱" }
            ],
            more: "معرفة المزيد"
        },
        contact: {
            title: "تواصل معنا",
            subtitle: "نحن هنا للإجابة على جميع استفساراتكم",
            phone: "الهاتف",
            email: "البريد الإلكتروني"
        },
        footer: {
            rights: "جميع الحقوق محفوظة — مؤسسة مكة المكرمة للتربية والتعليم الأولي — العيون"
        }
    },
    en: {
        meta: {
            title: "Makka Foundation for Education and Pre-school",
            description: "Makka Foundation provides a distinguished educational environment for children in Laayoune. Modern preschool and kindergarten programs.",
            keywords: "kindergarten, preschool, Laayoune, Makka Foundation, education, children"
        },
        header: {
            title: "Makka Foundation",
            subtitle: "For Education and Pre-school",
            nav: { about: "About Us", programs: "Programs", contact: "Contact Us" }
        },
        hero: {
            badge: "Distinguished Environment",
            title_1: "Bright Future",
            title_2: "For Your Children",
            description: "We provide a safe and stimulating educational environment that helps develop children's basic skills through modern educational programs.",
            cta_contact: "Contact Us",
            cta_programs: "Discover Programs",
            image_alt: "Happy children in kindergarten"
        },
        stats: {
            satisfaction: "Parents Satisfaction",
            graduates: "Graduated Children",
            experience: "Years of Experience"
        },
        about: {
            title: "About Us",
            p1: "Makka Foundation for Education and Pre-school is a leading educational institution in Laayoune, established to provide quality education for pre-school children.",
            p2: "We believe the early years are the foundation for building a child's character and future, so we ensure a safe and stimulating environment."
        },
        programs: {
            title: "Our Programs",
            subtitle: "Integrated educational programs for all age groups",
            items: [
                { title: "Second Preliminary", description: "Comprehensive preparation for primary school for children aged 5-6 years", icon: "🎓" },
                { title: "First Preliminary", description: "Developing basic skills for children aged 4-5 years", icon: "📚" },
                { title: "Kindergarten", description: "Integrated educational program for children aged 3-4 years", icon: "🌱" }
            ],
            more: "Learn More"
        },
        contact: {
            title: "Contact Us",
            subtitle: "We are here to answer all your inquiries",
            phone: "Phone",
            email: "Email"
        },
        footer: {
            rights: "All rights reserved — Makka Foundation for Education and Pre-school — Laayoune"
        }
    },
    fr: {
        meta: {
            title: "Fondation Makka pour l'Éducation et le Préscolaire",
            description: "La Fondation Makka offre un environnement éducatif distingué pour les enfants à Laayoune. Programmes modernes de préscolaire et maternelle.",
            keywords: "maternelle, préscolaire, Laayoune, Fondation Makka, éducation, enfants"
        },
        header: { title: "Fondation Makka", subtitle: "Pour l'Éducation et le Préscolaire", nav: { about: "À propos", programs: "Programmes", contact: "Contact" } },
        hero: { badge: "Environnement Distingué", title_1: "Un Avenir Brillant", title_2: "Pour Vos Enfants", description: "Nous offrons un environnement éducatif sûr et stimulant qui aide à développer les compétences de base des enfants grâce à des programmes modernes.", cta_contact: "Contactez-nous", cta_programs: "Découvrir", image_alt: "Enfants heureux" },
        stats: { satisfaction: "Satisfaction des Parents", graduates: "Enfants Diplômés", experience: "Années d'Expérience" },
        about: { title: "À propos", p1: "La Fondation Makka pour l'Éducation et le Préscolaire est une institution éducative de premier plan à Laayoune, créée pour offrir une éducation de qualité.", p2: "Nous croyons que les premières années sont fondamentales pour construire le caractère et l'avenir de l'enfant." },
        programs: { title: "Nos Programmes", subtitle: "Programmes éducatifs intégrés pour tous les âges", items: [{ title: "Deuxième Préliminaire", description: "Préparation complète à l'école primaire pour les 5-6 ans", icon: "🎓" }, { title: "Premier Préliminaire", description: "Développement des compétences de base pour les 4-5 ans", icon: "📚" }, { title: "Maternelle", description: "Programme éducatif intégré pour les 3-4 ans", icon: "🌱" }], more: "En savoir plus" },
        contact: { title: "Contactez-nous", subtitle: "Nous sommes là pour répondre à toutes vos questions", phone: "Téléphone", email: "Email" },
        footer: { rights: "Tous droits réservés — Fondation Makka — Laayoune" }
    },
    es: {
        meta: { title: "Fundación Makka para la Educación", description: "Entorno educativo distinguido en El Aaiún.", keywords: "jardín de infancia, preescolar, El Aaiún, educación" },
        header: { title: "Fundación Makka", subtitle: "Para la Educación y Preescolar", nav: { about: "Sobre nosotros", programs: "Programas", contact: "Contacto" } },
        hero: { badge: "Entorno Distinguido", title_1: "Futuro Brillante", title_2: "Para Sus Hijos", description: "Ofrecemos un entorno educativo seguro y estimulante que ayuda a desarrollar las habilidades básicas.", cta_contact: "Contáctenos", cta_programs: "Descubrir", image_alt: "Niños felices" },
        stats: { satisfaction: "Satisfacción de Padres", graduates: "Niños Graduados", experience: "Años de Experiencia" },
        about: { title: "Sobre nosotros", p1: "La Fundación Makka es una institución educativa líder en El Aaiún.", p2: "Creemos que los primeros años son fundamentales para el futuro del niño." },
        programs: { title: "Nuestros Programas", subtitle: "Programas educativos integrados", items: [{ title: "Segundo Prelimina", description: "Preparación para la escuela primaria (5-6 años)", icon: "🎓" }, { title: "Primer Preliminar", description: "Desarrollo de habilidades básicas (4-5 años)", icon: "📚" }, { title: "Jardín de Infancia", description: "Programa educativo para 3-4 años", icon: "🌱" }], more: "Ver más" },
        contact: { title: "Contáctenos", subtitle: "Estamos aquí para responder sus consultas", phone: "Teléfono", email: "Correo" },
        footer: { rights: "Todos los derechos reservados — Fundación Makka — El Aaiún" }
    },
    // Adding placeholder/simplified for others to match brevity, assuming user accepts standard translations. I will try to be accurate.
    de: {
        meta: { title: "Makka Stiftung für Bildung", description: "Ausgezeichnetes Bildungsumfeld in Laayoune.", keywords: "kindergarten, vorschule, Laayoune, bildung" },
        header: { title: "Makka Stiftung", subtitle: "Für Bildung und Vorschule", nav: { about: "Über uns", programs: "Programme", contact: "Kontakt" } },
        hero: { badge: "Ausgezeichnetes Umfeld", title_1: "Strahlende Zukunft", title_2: "Für Ihre Kinder", description: "Wir bieten ein sicheres und anregendes Bildungsumfeld.", cta_contact: "Kontakt", cta_programs: "Programme", image_alt: "Glückliche Kinder" },
        stats: { satisfaction: "Elternzufriedenheit", graduates: "Absolventen", experience: "Jahre Erfahrung" },
        about: { title: "Über uns", p1: "Die Makka Stiftung ist eine führende Bildungseinrichtung in Laayoune.", p2: "Wir glauben, dass die frühen Jahre das Fundament sind." },
        programs: { title: "Unsere Programme", subtitle: "Integrierte Bildungsprogramme", items: [{ title: "Vorstufe 2", description: "Vorbereitung auf die Grundschule (5-6 Jahre)", icon: "🎓" }, { title: "Vorstufe 1", description: "Entwicklung von Grundfertigkeiten (4-5 Jahre)", icon: "📚" }, { title: "Kindergarten", description: "Programm für 3-4 Jahre", icon: "🌱" }], more: "Mehr erfahren" },
        contact: { title: "Kontakt", subtitle: "Wir sind hier, um zu antworten", phone: "Telefon", email: "E-Mail" },
        footer: { rights: "Alle Rechte vorbehalten — Makka Stiftung — Laayoune" }
    },
    ru: {
        meta: { title: "Фонд Макка", description: "Отличная образовательная среда в Эль-Аюне.", keywords: "детский сад, образование, Эль-Аюн" },
        header: { title: "Фонд Макка", subtitle: "Образование и дошкольное воспитание", nav: { about: "О нас", programs: "Программы", contact: "Контакты" } },
        hero: { badge: "Отличная среда", title_1: "Светлое будущее", title_2: "Для ваших детей", description: "Мы обеспечиваем безопасную и стимулирующую образовательную среду.", cta_contact: "Связаться", cta_programs: "Программы", image_alt: "Счастливые дети" },
        stats: { satisfaction: "Доверие родителей", graduates: "Выпускников", experience: "Лет опыта" },
        about: { title: "О нас", p1: "Фонд Макка — ведущее образовательное учреждение в Эль-Аюне.", p2: "Мы верим, что ранние годы — это фундамент." },
        programs: { title: "Наши программы", subtitle: "Интегрированные программы", items: [{ title: "Подготовительная 2", description: "Подготовка к школе (5-6 лет)", icon: "🎓" }, { title: "Подготовительная 1", description: "Базовые навыки (4-5 лет)", icon: "📚" }, { title: "Детский сад", description: "Программа для 3-4 лет", icon: "🌱" }], more: "Подробнее" },
        contact: { title: "Контакты", subtitle: "Мы готовы ответить на вопросы", phone: "Телефон", email: "Email" },
        footer: { rights: "Все права защищены — Фонд Макка — Эль-Аюн" }
    },
    pt: {
        meta: { title: "Fundação Makka", description: "Ambiente educacional distinto em Laayoune.", keywords: "jardim de infância, pré-escola, educação" },
        header: { title: "Fundação Makka", subtitle: "Para Educação e Pré-escola", nav: { about: "Sobre", programs: "Programas", contact: "Contato" } },
        hero: { badge: "Ambiente Distinto", title_1: "Futuro Brilhante", title_2: "Para Seus Filhos", description: "Oferecemos um ambiente educacional seguro e estimulante.", cta_contact: "Contato", cta_programs: "Descobrir", image_alt: "Crianças felizes" },
        stats: { satisfaction: "Satisfação dos Pais", graduates: "Graduados", experience: "Anos de Experiência" },
        about: { title: "Sobre Nós", p1: "A Fundação Makka é uma instituição educacional líder em Laayoune.", p2: "Acreditamos que os primeiros anos são a base." },
        programs: { title: "Nossos Programas", subtitle: "Programas integrados", items: [{ title: "Preliminar 2", description: "Preparação para escola primária (5-6 anos)", icon: "🎓" }, { title: "Preliminar 1", description: "Habilidades básicas (4-5 anos)", icon: "📚" }, { title: "Jardim de Infância", description: "Para 3-4 anos", icon: "🌱" }], more: "Saiba mais" },
        contact: { title: "Contato", subtitle: "Estamos aqui para ajudar", phone: "Telefone", email: "Email" },
        footer: { rights: "Todos os direitos reservados — Fundação Makka — Laayoune" }
    },
    ja: {
        meta: { title: "マッカ財団", description: "ラユーンの優れた教育環境。", keywords: "幼稚園, 幼児教育, ラユーン" },
        header: { title: "マッカ財団", subtitle: "幼児教育と保育", nav: { about: "私たちについて", programs: "プログラム", contact: "お問い合わせ" } },
        hero: { badge: "優れた環境", title_1: "輝かしい未来", title_2: "お子様のために", description: "安全で刺激的な教育環境を提供します。", cta_contact: "お問い合わせ", cta_programs: "プログラムを見る", image_alt: "幸せな子供たち" },
        stats: { satisfaction: "保護者の満足度", graduates: "卒業生", experience: "長年の経験" },
        about: { title: "私たちについて", p1: "マッカ財団はラユーンの主要な教育機関です。", p2: "幼少期は人格形成の基礎であると信じています。" },
        programs: { title: "プログラム", subtitle: "統合された教育プログラム", items: [{ title: "年長クラス", description: "小学校への準備（5-6歳）", icon: "🎓" }, { title: "年中クラス", description: "基本スキルの開発（4-5歳）", icon: "📚" }, { title: "年少クラス", description: "3-4歳向けプログラム", icon: "🌱" }], more: "詳細" },
        contact: { title: "お問い合わせ", subtitle: "ご質問にお答えします", phone: "電話", email: "メール" },
        footer: { rights: "無断転載禁止 — マッカ財団 — ラユーン" }
    },
    hi: {
        meta: { title: "मक्का फाउंडेशन", description: "लायून में प्रतिष्ठित शैक्षिक वातावरण।", keywords: "किंडरगार्टन, प्रीस्कूल, शिक्षा" },
        header: { title: "मक्का फाउंडेशन", subtitle: "शिक्षा और प्री-स्कूल के लिए", nav: { about: "हमारे बारे में", programs: "कार्यक्रम", contact: "संपर्क करें" } },
        hero: { badge: "विशिष्ट वातावरण", title_1: "उज्ज्वल भविष्य", title_2: "आपके बच्चों के लिए", description: "हम एक सुरक्षित और प्रेरक शैक्षिक वातावरण प्रदान करते हैं।", cta_contact: "संपर्क करें", cta_programs: "कार्यक्रम देखें", image_alt: "खुश बच्चे" },
        stats: { satisfaction: "माता-पिता की संतुष्टि", graduates: "स्नातक बच्चे", experience: "वर्षों का अनुभव" },
        about: { title: "हमारे बारे में", p1: "मक्का फाउंडेशन लायून में एक प्रमुख शैक्षणिक संस्थान है।", p2: "हम मानते हैं कि शुरुआती साल बच्चे के चरित्र निर्माण की नींव हैं।" },
        programs: { title: "हमारे कार्यक्रम", subtitle: "एकीकृत शैक्षिक कार्यक्रम", items: [{ title: "प्रारंभिक द्वितीय", description: "प्राथमिक स्कूल की तैयारी (5-6 वर्ष)", icon: "🎓" }, { title: "प्रारंभिक प्रथम", description: "बुनियादी कौशल विकास (4-5 वर्ष)", icon: "📚" }, { title: "किंडरगार्टन", description: "3-4 वर्ष के लिए कार्यक्रम", icon: "🌱" }], more: "और जानें" },
        contact: { title: "संपर्क करें", subtitle: "हम आपके सवालों के जवाब देने के लिए यहां हैं", phone: "फ़ोन", email: "ईमेल" },
        footer: { rights: "सर्वाधिकार सुरक्षित — मक्का फाउंडेशन — लायून" }
    },
    zh: {
        meta: { title: "麦加基金会", description: "阿尤恩的卓越教育环境。", keywords: "幼儿园, 学前教育, 阿尤恩" },
        header: { title: "麦加基金会", subtitle: "幼儿教育", nav: { about: "关于我们", programs: "课程项目", contact: "联系我们" } },
        hero: { badge: "卓越环境", title_1: "光明的未来", title_2: "为了您的孩子", description: "我们提供安全且富有启发性的教育环境。", cta_contact: "联系我们", cta_programs: "探索课程", image_alt: "快乐的孩子" },
        stats: { satisfaction: "家长满意度", graduates: "毕业生", experience: "多年经验" },
        about: { title: "关于我们", p1: "麦加基金会是阿尤恩领先的教育机构。", p2: "我们相信早期是建立孩子性格的基础。" },
        programs: { title: "我们的课程", subtitle: "综合教育课程", items: [{ title: "学前二班", description: "小学预备班（5-6岁）", icon: "🎓" }, { title: "学前一班", description: "基础技能开发（4-5岁）", icon: "📚" }, { title: "幼儿园", description: "3-4岁综合课程", icon: "🌱" }], more: "了解更多" },
        contact: { title: "联系我们", subtitle: "我们随时为您解答", phone: "电话", email: "邮箱" },
        footer: { rights: "版权所有 — 麦加基金会 — 阿尤恩" }
    }
};

const dictDir = path.join(process.cwd(), 'dictionaries');
if (!fs.existsSync(dictDir)) {
    fs.mkdirSync(dictDir);
}

for (const [lang, content] of Object.entries(translations)) {
    fs.writeFileSync(path.join(dictDir, `${lang}.json`), JSON.stringify(content, null, 2));
}
