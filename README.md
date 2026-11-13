# Zilan Zalilan — Professional Portfolio

Website portfolio statis profesional untuk Zilan Zalilan, dibuat dari struktur ASLAM tetapi diarahkan ke tampilan corporate modern, bersih, dan siap dipakai sebagai portfolio Software Engineer Intern.

## Cara Menjalankan

Buka langsung `index.html`, atau jalankan local server:

```bash
python -m http.server 3000
```

Lalu buka:

```text
http://localhost:3000
```

## Login Admin Demo

```text
Email: admin@zilan.dev
Password: zilan123
```

## Fitur

- Landing page portfolio profesional.
- Dark mode dan light mode.
- Multi-language ID/EN.
- Project filter dan search.
- Featured project dan case study modal.
- Hall of Systems screenshot gallery.
- Skill/technology stack.
- Journey timeline.
- Blog/learning notes.
- Contact form.
- Admin dashboard mock CMS berbasis localStorage.
- CRUD profile, project, education, skill, experience, blog, message, dan settings.
- Responsive desktop, tablet, dan mobile.

## Struktur File

```text
zilan-professional-portfolio/
├─ index.html
├─ admin-login.html
├─ admin.html
├─ css/
│  └─ styles.css
├─ js/
│  ├─ data.js
│  └─ app.js
└─ assets/
   ├─ profile-zilan.jpg
   ├─ CV-Zilan.pdf
   ├─ CV-PORTOFOLIO-Zilan.pdf
   ├─ project-astraea.webp
   ├─ project-lencana.webp
   └─ project-salindia.webp
```

## Catatan

Admin panel memakai `localStorage`, sehingga cocok untuk demo frontend. Untuk production, sambungkan ke backend/database seperti Supabase, Firebase, Laravel API, atau Next.js API + database.


## Update Credential Library

Versi ini sudah diisi dengan sertifikat asli dari folder `Sertifikat Zilan`:

- 21 file PDF sertifikat dipindahkan ke `assets/certificates/files/`.
- 21 thumbnail WebP dibuat otomatis dari halaman pertama PDF dan disesuaikan agar rapi di card website.
- Data sertifikat di `js/data.js` sudah diganti dari dummy menjadi data asli.
- Certificate library mendukung featured certificate, filter kategori, pencarian, modal preview, open PDF, dan download proof.
- Admin panel mock CMS tetap bisa mengedit data sertifikat melalui localStorage.

Catatan: jika sebelumnya website pernah dibuka di browser yang sama, refresh normal sudah memakai storage key baru. Jika masih muncul data lama, hapus site data/localStorage browser.

Project 3 sudah disingkat menjadi: `ASTRAEA — Smart Traffic Dashboard`.
