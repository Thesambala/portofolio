# Aslam Rosul Ahmad — Lando-Inspired Professional Portfolio

Website portfolio statis yang dibuat untuk Aslam Rosul Ahmad dengan gaya premium, visual besar, immersive scroll, gallery project, multi-language, dark/light mode, dan admin panel mock CMS.

## Cara Menjalankan

Buka langsung file:

```bash
index.html
```

Atau jalankan local server:

```bash
python -m http.server 3000
```

Lalu buka:

```text
http://localhost:3000
```

## Login Admin Demo

```text
Email: admin@aslam.dev
Password: aslam123
```

## Fitur Utama

- Landing page portfolio profesional
- Headline hero dan Message section sudah diperkecil agar lebih proporsional
- Floating contact rail dengan icon Gmail, GitHub, LinkedIn, dan Portfolio Web
- Inspirasi struktur dari website Lando Norris: hero cinematic, big typography, immersive scroll, content gallery, section split, visual storytelling
- Dark mode dan light mode
- Multi-language ID/EN
- Project filter dan search
- Featured case study project
- Project detail modal
- Hall of Systems screenshot gallery
- Stack/skill telemetry
- Journey timeline
- Blog/notes section
- Contact form
- Admin dashboard mock CMS berbasis localStorage
- CRUD project, education, skills, experience, blog
- Contact messages
- Website settings
- Responsive desktop/tablet/mobile

## Struktur File

```text
aslam-portfolio-lando-pro/
├─ index.html
├─ css/
│  └─ styles.css
├─ js/
│  ├─ data.js
│  └─ app.js
└─ assets/
   ├─ profile-aslam.jpg
   ├─ project-astraea.png
   ├─ project-leafy.webp
   ├─ project-photolabku.webp
   ├─ project-katadata.webp
   └─ project-fixit.webp
```

## Catatan

Admin panel pada versi ini memakai `localStorage`, jadi cocok untuk demo frontend. Kalau mau production, bagian admin perlu disambungkan ke backend/database seperti Supabase, Firebase, Laravel API, atau Next.js API + database.
