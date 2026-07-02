window.PORTFOLIO_DATA = {
  profile: {
    name: 'Zilan Zalilan',
    headline: 'Web Developer • Laravel Developer • Software Engineering Student',
    headlineEn: 'Web Developer • Laravel Developer • Software Engineering Student',
    email: 'zilanzalilan18@gmail.com',
    github: 'https://github.com/Thesambala',
    linkedin: 'https://linkedin.com/in/zilanzalilan',
    website: '#',
    cv: 'assets/CV-Zilan.pdf',
    location: 'Surabaya/Malang, Indonesia',
    photo: 'assets/profile-zilan.jpg'
  },
  focus: [
    { icon: '▣', title: 'Web Development', desc: 'Pengembangan aplikasi berbasis web menggunakan framework Laravel dan ekosistem PHP.', descEn: 'Web-based application development using the Laravel framework and PHP ecosystem.' },
    { icon: '◈', title: 'Database Architecture', desc: 'Merancang arsitektur database relasional menggunakan SQL (MySQL, SQLServer) secara terstruktur.', descEn: 'Designing relational database architecture using structured SQL (MySQL, SQLServer).' },
    { icon: '✦', title: 'UI/UX Design', desc: 'Merancang antarmuka pengguna yang intuitif (wireframe, mockup, prototype) menggunakan Figma.', descEn: 'Designing intuitive user interfaces (wireframe, mockup, prototype) using Figma.' },
    { icon: '⌁', title: 'IoT & Smart Systems', desc: 'Membangun prototipe perangkat keras IoT cerdas dan integrasi telemetry data real-time.', descEn: 'Building smart IoT hardware prototypes and integrating real-time telemetry data.' }
  ],
  education: [
    {
      period: '2024 - Sekarang', periodEn: '2024 - Present',
      title: 'Politeknik Negeri Malang',
      subtitle: 'D4 - Teknik Informatika', subtitleEn: 'Bachelor of Applied Science - Informatics Engineering',
      desc: 'Mahasiswa semester 6. Sedang menempuh pendidikan untuk konversi dari D2 menuju D4.',
      descEn: '6th-semester student. Currently pursuing a degree conversion from Diploma-2 to Diploma-4.',
      tags: ['Software Engineering', 'Web Development', 'System Analysis']
    },
    {
      period: '2022 - 2023', periodEn: '2022 - 2023',
      title: 'Politeknik Negeri Malang',
      subtitle: 'D2 - Perangkat Piranti Lunak Situs', subtitleEn: 'Diploma-2 - Web Development',
      desc: 'Lulusan D2 dengan fokus pada pengembangan perangkat lunak berbasis web.',
      descEn: 'D2 graduate focusing on web-based software development.',
      tags: ['Laravel', 'PHP', 'MySQL', 'Figma']
    },
    {
      period: '2019 - 2022', periodEn: '2019 - 2022',
      title: 'SMKN 2 Malang',
      subtitle: 'Teknik Komputer dan Jaringan', subtitleEn: 'Computer and Network Engineering',
      desc: 'Lulusan SMK jurusan TKJ.',
      descEn: 'Vocational high school graduate majoring in Computer and Network Engineering.',
      tags: ['Networking', 'Hardware', 'Basic Logic']
    }
  ],
  projects: [
    {
      id: 'astraea', featured: true,
      title: 'ASTRAEA — Adaptive Smart Traffic Regulation & Cloud Analytics',
      category: 'IoT & Smart City',
      image: 'assets/project-astraea.png',
      short: 'Sistem monitoring dan manajemen lalu lintas cerdas pada pertigaan (3-way junction) berbasis IoT menggunakan ESP32, IR sensor, dan dashboard real-time.',
      shortEn: 'An IoT-based smart traffic monitoring and management system for a 3-way junction using ESP32, IR sensors, and a real-time dashboard.',
      long: 'ASTRAEA adalah prototipe sistem pengaturan lalu lintas adaptif pintar yang dirancang khusus untuk area persimpangan pertigaan (3-way T-junction). Menggunakan mikrokontroler ESP32 terintegrasi dengan sensor Infrared (IR) dan ultrasonik untuk mendeteksi keberadaan serta menghitung kepadatan antrean kendaraan secara real-time. Data telemetry dikirim secara andal via protokol MQTT untuk kemudian dipetakan ke dalam dashboard analitik berbasis Next.js dan Tailwind CSS, memungkinkan monitoring status lampu lalu lintas adaptif serta remote configuration.',
      longEn: 'ASTRAEA is a smart adaptive traffic regulation prototype designed specifically for a 3-way T-junction. It utilizes an ESP32 microcontroller integrated with Infrared (IR) and ultrasonic sensors to detect vehicle presence and calculate queue density in real time. Telemetry data is reliably transmitted via MQTT protocol to a Next.js and Tailwind CSS dashboard, enabling adaptive traffic light status monitoring and remote configuration.',
      tech: ['ESP32', 'IR Sensor', 'Ultrasonic', 'MQTT', 'Next.js', 'Tailwind CSS', 'Web Prototype', 'Database'],
      problem: 'Durasi lampu lalu lintas statis di persimpangan pertigaan sering menyebabkan penumpukan kendaraan yang tidak seimbang.',
      problemEn: 'Static traffic light durations at 3-way junctions often cause unbalanced vehicle accumulation.',
      solution: 'Mengimplementasikan sensor pendeteksi kendaraan real-time dan pengiriman telemetry data via MQTT ke dashboard untuk adaptasi lampu secara presisi.',
      solutionEn: 'Implemented real-time vehicle detection sensors and telemetry data transmission via MQTT to a dashboard for precise signal adaptation.',
      role: 'IoT Developer & Hardware Integrator', roleEn: 'IoT Developer & Hardware Integrator',
      architecture: 'ESP32 Nodes + Sensors → MQTT Broker → Web Dashboard Data Receiver → Real-Time Analytics Panel.',
      challenges: 'Mengkalibrasi akurasi pembacaan sensor IR pada miniatur maket pertigaan dan menjaga latensi pengiriman data MQTT.',
      result: 'Prototipe sistem lampu adaptif fungsional pada tata letak pertigaan dengan visibilitas telemetry penuh di dashboard.',
      live: '#', github: 'https://github.com/Thesambala'
    },
    {
      id: 'lencana', featured: true,
      title: 'LENCANA — Sistem Informasi Prestasi Mahasiswa',
      category: 'UI/UX Design',
      image: 'assets/project-lencana.png',
      short: 'Platform digital untuk mendokumentasikan dan mempublikasikan pencapaian akademik & non-akademik mahasiswa.',
      shortEn: 'A digital platform to document and publish students academic & non-academic achievements.',
      long: 'Merancang tampilan antarmuka pengguna (User Interface/UI) untuk Sistem Informasi Prestasi Mahasiswa (LENCANA). Proyek ini dikerjakan untuk meningkatkan pengalaman pengguna. Tanggung jawab utama meliputi pembuatan wireframe dan mockup visual menggunakan Figma. Hasil desain berfokus pada navigasi yang intuitif dan tata letak informasi yang jelas, memungkinkan pengguna (mahasiswa dan staf) mengakses data prestasi dengan mudah dan efisien.',
      longEn: 'Designed the User Interface (UI) for the Student Achievement Information System (LENCANA). The main responsibilities included creating wireframes and visual mockups using Figma. The design focuses on intuitive navigation and a clear layout of information, allowing users to access achievement data easily and efficiently.',
      tech: ['Figma', 'UI Design', 'Wireframe', 'Prototype'],
      problem: 'Dokumentasi prestasi mahasiswa membutuhkan platform yang rapi, mudah dinavigasi, dan terpusat.',
      problemEn: 'Student achievement documentation requires a neat, easily navigable, and centralized platform.',
      solution: 'Merancang antarmuka (UI) dengan fokus pada User Experience yang intuitif bagi mahasiswa dan staf.',
      solutionEn: 'Designed a UI focusing on an intuitive User Experience for both students and staff.',
      role: 'UI/UX Designer', roleEn: 'UI/UX Designer',
      architecture: 'Wireframing → Prototyping → Mockup Design (Figma).',
      challenges: 'Menyusun hierarki visual informasi prestasi yang padat agar tetap mudah dibaca.',
      result: 'Desain prototipe interaktif yang siap diimplementasikan oleh tim developer.',
      live: '#', github: '#'
    },
    {
      id: 'salindia', featured: true,
      title: 'SALINDIA — Sistem Manajemen Sarana dan Prasarana',
      category: 'Web Development', 
      image: 'assets/project-salindia.png',
      short: 'Prototipe sistem untuk memfasilitasi pendataan, peminjaman, dan pemeliharaan aset secara terpusat.',
      shortEn: 'A system prototype to facilitate centralized asset data collection, borrowing, and maintenance.',
      long: 'Mengembangkan prototipe Sistem Manajemen Sarana dan Prasarana (SALINDIA) untuk memfasilitasi pendataan, peminjaman, dan pemeliharaan aset secara terpusat. Proyek ini bertujuan meningkatkan efisiensi operasional dan akuntabilitas inventaris pada lembaga atau organisasi.',
      longEn: 'Developed a prototype for the Facilities and Infrastructure Management System (SALINDIA) to facilitate centralized asset tracking, borrowing, and maintenance. This project aimed to improve operational efficiency and inventory accountability.',
      tech: ['Web', 'Prototype', 'Database', 'UI Design'],
      problem: 'Pendataan dan peminjaman inventaris sering kali tidak terpusat dan kurang akuntabel.',
      problemEn: 'Inventory tracking and borrowing were often decentralized and lacked accountability.',
      solution: 'Membangun prototipe sistem web untuk manajemen aset dari pendataan hingga pemeliharaan.',
      solutionEn: 'Built a web system prototype for asset management from data entry to maintenance.',
      role: 'Web Developer & UI Designer', roleEn: 'Web Developer & UI Designer',
      architecture: 'Database Architecture → Interface Design → Web Prototype',
      challenges: 'Mendesain struktur database yang mampu mencatat log peminjaman dan kondisi pemeliharaan aset secara akurat.',
      result: 'Prototipe sistem manajemen aset terpusat yang meningkatkan efisiensi operasional.',
      live: '#', github: '#'
    }
  ],
  skills: {
    'Web Development': ['Laravel', 'PHP', 'HTML', 'CSS', 'JavaScript', 'Next.js'],
    'Database & Backend': ['Python', 'Java', 'SQL', 'MySQL', 'SQL Server'],
    'Hardware & IoT': ['ESP32 Controller', 'Infrared Sensors', 'Ultrasonic Sensors', 'MQTT Protocol'],
    'Design & Tools': ['Figma', 'Canva', 'Capcut', 'Google Sheet', 'Microsoft Office'],
    'Soft Skills': ['Leadership', 'Teamwork', 'Critical Thinking', 'Analytical Thinking', 'Communication', 'Problem Solving', 'Time Management']
  },
  experiences: [
    { period: '2024', title: 'Saksi Pemilu', desc: 'Mengawal dan memastikan integritas serta transparansi proses pemungutan suara.', descEn: 'Guarding and ensuring the integrity and transparency of the voting process.', tags: ['Attention to Detail', 'Integrity', 'Data Validation'] },
    { period: '2023', title: 'Internship (Olahkarsa)', desc: 'Merancang UI dengan Figma dan berkolaborasi dengan developer untuk implementasi kode website internal/eksternal.', descEn: 'Designed UI with Figma and collaborated with developers for internal/external web implementation.', tags: ['Figma', 'UI Design', 'Web', 'Teamwork'] },
    { period: '2022 - 2023', title: 'Barista (E29)', desc: 'Mengelola operasional harian, transaksi, dan stok bahan baku dengan akurasi tinggi.', descEn: 'Managed daily operations, transactions, and raw material stock with high accuracy.', tags: ['Customer Service', 'Multi-tasking', 'Communication'] }
  ],
  blog: [
    { title: 'Sertifikat Kompetensi Pengembang Web Pratama', titleEn: 'Junior Web Developer Competency Certificate', category: 'Sertifikasi BNSP', date: '2023-01-01', excerpt: 'Sertifikasi profesi resmi dari Badan Nasional Sertifikasi Profesi (BNSP) di bidang pengembangan web.', excerptEn: 'Official professional certification from BNSP in web development.' },
    { title: 'Sertifikat KKNI Level II TKJ', titleEn: 'KKNI Level II TKJ Certificate', category: 'Sertifikasi BNSP', date: '2022-01-01', excerpt: 'Tersertifikasi KKNI Level II pada Kompetensi Keahlian Teknik Komputer dan Jaringan dari BNSP.', excerptEn: 'Certified in KKNI Level II for Computer and Network Engineering Competency by BNSP.' },
    { title: 'Samsung Tech Institute (Level 1 & 2)', titleEn: 'Samsung Tech Institute (Level 1 & 2)', category: 'Pelatihan', date: '2019 - 2022', excerpt: 'Menyelesaikan program Samsung Tech Institute kualifikasi Level 1 & Level 2 Technician of HandHeld Product.', excerptEn: 'Completed the Samsung Tech Institute program qualification Level 1 & Level 2 Technician of HandHeld Product.' }
  ],
  messages: [],
  settings: {
    siteTitle: 'Zilan Zalilan Portfolio',
    seoTitle: 'Zilan Zalilan — Professional Portfolio',
    seoDescription: 'Portfolio web development, Laravel, UI/UX Design, SQL Database, IoT Smart Traffic, dan Software Engineering.',
    defaultLanguage: 'id', maintenance: false, themeColor: 'cyan-violet'
  }
};

window.I18N = {
  id: {
    'nav.home': 'Home', 'nav.about': 'About', 'nav.projects': 'Projects', 'nav.stack': 'Stack', 'nav.journey': 'Journey', 'nav.blog': 'Credentials', 'nav.contact': 'Contact', 'nav.cv': 'Download CV',
    'hero.kicker': 'Polinema Informatics • State Polytechnic of Malang', 'hero.line1': 'Design', 'hero.line2': 'Develop', 'hero.line3': 'Deliver', 'hero.role': 'Web Developer • Laravel Developer • Software Engineering Student', 'hero.desc': 'Saya mengembangkan aplikasi web modern menggunakan Laravel, PHP, SQL, dan JavaScript. Saya juga memiliki pengalaman merancang antarmuka pengguna menggunakan Figma serta membangun solusi digital yang efisien dan scalable.', 'hero.projects': 'Explore Projects', 'hero.contact': 'Contact Me',
    'stats.projects': 'Major Projects', 'about.title': 'About Zilan', 'about.body': 'Saya Zilan Zalilan, mahasiswa semester 6 di D4 Teknik Informatika Politeknik Negeri Malang (Polinema). Saya bersemangat mengeksplorasi dunia pengembangan solusi digital dan implementasi teknologi. Fokus utama saya adalah menerapkan logika pemrograman untuk menciptakan solusi yang efisien dan scalable, dengan spesialisasi menggunakan framework Laravel dan ekosistem PHP.', 'about.quote': '“Turning ideas into efficient, scalable, and user-friendly digital solutions.”',
    'focus.desc': 'Bidang utama yang saya tekuni untuk mengubah proyek akademik dan kebutuhan taktis menjadi solusi digital yang siap pakai.', 'projects.title': 'Featured Systems', 'projects.desc': 'Kumpulan sistem terbaik yang dirancang secara struktural, menyelesaikan masalah inventarisasi, manajemen lalu lintas, maupun pendataan prestasi.', 'hall.title': 'System Interfaces & Telemetry', 'hall.desc': 'Dokumentasi antarmuka digital dari perancangan prototype Figma hingga perancangan arsitektur sistem dan IoT.', 'stack.title': 'Technology Stack', 'stack.desc': 'Kombinasi bahasa pemrograman, framework, dan tools yang saya gunakan secara aktif dalam proses development.', 'journey.desc': 'Linimasa perjalanan akademik dan profesional dari pelatihan kejuruan hingga pengembangan aplikasi tingkat lanjut.', 'blog.title': 'Certificates & Achievements', 'blog.desc': 'Sertifikasi kompetensi industri, rekam jejak karir non-akademik, dan pengalaman kerja lapangan.', 'contact.title': 'Let’s build something meaningful.', 'contact.desc': 'Hubungi saya untuk kolaborasi proyek, magang, diskusi rekayasa perangkat lunak, atau pengembangan aplikasi web.',
    'form.name': 'Nama', 'form.subject': 'Subjek', 'form.message': 'Pesan', 'form.send': 'Kirim Pesan'
  },
  en: {
    'nav.home': 'Home', 'nav.about': 'About', 'nav.projects': 'Projects', 'nav.stack': 'Stack', 'nav.journey': 'Journey', 'nav.blog': 'Credentials', 'nav.contact': 'Contact', 'nav.cv': 'Download CV',
    'hero.kicker': 'Polinema Informatics • State Polytechnic of Malang', 'hero.line1': 'Design', 'hero.line2': 'Develop', 'hero.line3': 'Deliver', 'hero.role': 'Web Developer • Laravel Developer • Software Engineering Student', 'hero.desc': 'I develop modern web applications using Laravel, PHP, SQL, and JavaScript. I also have experience designing user interfaces with Figma and building efficient, scalable digital solutions.', 'hero.projects': 'Explore Projects', 'hero.contact': 'Contact Me',
    'stats.projects': 'Major Projects', 'about.title': 'About Zilan', 'about.body': 'I am Zilan Zalilan, a 6th-semester Informatics Engineering student at State Polytechnic of Malang (Polinema). I am passionate about exploring digital solutions and technology implementation. My main focus is applying programming logic to create efficient and scalable solutions, specifically using the Laravel framework and PHP ecosystem.', 'about.quote': '“Turning ideas into efficient, scalable, and user-friendly digital solutions.”',
    'focus.desc': 'Main fields I pursue to turn academic projects and tactical needs into ready-to-use digital solutions.', 'projects.title': 'Featured Systems', 'projects.desc': 'A collection of the best structurally designed systems, solving inventory, traffic regulation, and achievement data problems.', 'hall.title': 'System Interfaces & Telemetry', 'hall.desc': 'Digital interface documentation from Figma prototype designs to system architecture and IoT planning.', 'stack.title': 'Technology Stack', 'stack.desc': 'A combination of programming languages, frameworks, and tools I actively use in the development process.', 'journey.desc': 'A timeline of academic and professional journeys from vocational training to advanced app development.', 'blog.title': 'Certificates & Achievements', 'blog.desc': 'Industrial competency certifications, non-academic career track records, and field work experience.', 'contact.title': 'Let’s build something meaningful.', 'contact.desc': 'Contact me for project collaboration, internship, software engineering discussion, or web app development.',
    'form.name': 'Name', 'form.subject': 'Subject', 'form.message': 'Message', 'form.send': 'Send Message'
  }
};