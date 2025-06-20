# DotDevelopers

A full-stack web application built with **Laravel**, **React**, and **Inertia.js**, designed to deliver a smooth and modern development experience.

---

## 🚀 Features

- 🧩 Full Inertia.js integration (SPA-like Laravel + React)
- 🗃️ MySQL database integration
- ⚙️ RESTful backend APIs
- 🎨 Tailwind CSS / Bootstrap styling (customizable)
- 🔐 Authentication system (if present)
- 📦 Clean project structure for scalability

---

## 🛠️ Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Backend      | Laravel 10.x       |
| Frontend     | React.js           |
| SSR Engine   | Inertia.js         |
| Database     | MySQL              |
| Package Mgmt | Composer / npm     |
| Styling      | Tailwind CSS / Bootstrap |

---

## ⚙️ Installation & Setup

Clone the repository and set up locally:

```bash
git clone https://github.com/KRISH092002/dotdevelopers.git
cd dotdevelopers


composer install
cp .env.example .env
php artisan key:generate
php artisan migrate

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password


npm install
npm run dev

php artisan serve
