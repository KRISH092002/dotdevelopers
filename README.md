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




APP_NAME=DotDevelopers
MIX_APP_NAME=DotDevelopers
APP_ENV=local
APP_KEY=base64:L3QIHjDUQTvJr3H0utWhMPatIrwPZfqWDBEAy/J2SdE=
APP_DEBUG=true
APP_URL=http://dotdevelopers.test
MIX_APP_URL=http://dotdevelopers.test
APP_DOMAIN=dotdevelopers.test

BILLING_APP_NAME="Billing App"
MIX_BILLING_APP_NAME="Billing App"
BILLING_APP_DOMAIN=billingapp.test
BILLING_APP_URL=http://billingapp.test


LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dotdevelopers
DB_USERNAME=root
DB_PASSWORD=

BILLING_DB_CONNECTION=billing_mysql
BILLING_DB_HOST=127.0.0.1
BILLING_DB_PORT=3306
BILLING_DB_DATABASE=ddev_billings
BILLING_DB_USERNAME=root
BILLING_DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
