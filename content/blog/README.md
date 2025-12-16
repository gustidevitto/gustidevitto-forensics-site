# Panduan Penulisan Blog

Untuk menambahkan artikel baru ke website, buat file `.md` atau `.mdx` baru di folder ini.

## Format File (Frontmatter)
Setiap file harus dimulai dengan metadata (frontmatter) di antara tanda `---` seperti contoh di bawah ini:

```markdown
---
title: "Judul Artikel Anda Di Sini"
date: "2025-12-16"
excerpt: "Ringkasan singkat artikel yang akan muncul di halaman daftar blog (tulis 1-2 kalimat)."
author: "Gusti Devitto"
category: "Financial Forensics"
image: "/assets/images/nama-gambar-cover.jpg"
---

## Mulai Tulis Konten Di Sini

Anda bisa menggunakan format **Markdown** standar:

### Sub Judul
- Poin 1
- Poin 2

> "Ini adalah contoh kutipan atau quote penting."

Paragraf biasa ditulis langsung di sini.
```

## Tips Gambar
1. Simpan gambar di folder `public/assets/images/`.
2. Panggil gambar di frontmatter menggunakan path absolut dari root web: `/assets/images/nama-file.jpg`.
