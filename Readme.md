# 🛍️ Full-Stack E-Commerce Platform  
A modern, full-featured e-commerce application built with **TypeScript**, **Bun**, **Express**, **PostgreSQL + Prisma**, and a **Vite + React + Tailwind** frontend.  
Includes full authentication, admin dashboard, product management, cart system, checkout via Stripe, analytics, coupon system, and more.

---

## 🚀 Tech Stack

### **Frontend**
[![Frontend Tech](https://skillicons.dev/icons?i=react,typescript,vite,redux,tailwind,bun)](https://skillicons.dev)

### **Backend**
[![Backend Tech](https://skillicons.dev/icons?i=nodejs,express,typescript,postgres,prisma,redis,bun)](https://skillicons.dev)

### **Other Tools**
[![Tools](https://skillicons.dev/icons?i=eslint,prettier,docker,git)](https://skillicons.dev)

---

## 📸 Screenshots  

### 🏠 Home Page  
![Home Page](./frontend/public/screenshots/home.png)

### 🛒 Cart  
![Cart](./frontend/public/screenshots/cart.png)

### 📊 Admin Dashboard  
<div style="display: flex; gap: 10px;">
  <img src="./frontend/public/screenshots/analytics.png" alt="Analytics Dashboard" width="49%" />
  <img src="./frontend/public/screenshots/table.png" alt="Table Dashboard" width="49%" />
</div>

---

## ✨ Features

### **👤 Authentication**
- JWT-based authentication  
- Access & Refresh tokens  
- Auto-login on reload (`checkAuth`)  
- Protected routes (client + server)

### **🛒 E-Commerce Functionality**
- Add/remove/update cart items  
- Real-time quantity updates  
- Coupon system  
- People-also-bought recommendations  
- Stripe Checkout integration  

### **🛠️ Admin Features**
- Create / Edit / Delete products  
- Toggle featured products  
- View analytics (sales, revenue, etc.)  
- Upload product images via Cloudinary  
- Fully animated dashboard with Framer Motion  

### **🌐 Products**
- Browse by categories  
- Featured products  
- Recommendations endpoint  
- Real-time inventory syncing  

### **🛡️ Backend & Security**
- Rate limiting  
- Helmet security  
- Redis-backed rate-limiter  
- File uploads with temp cleanup via cron  
- CORS configured  
- Logging with Morgan + Winston  

---

## 🔧 Environment Variables

### **Frontend (`/frontend/.env`)**
```env
VITE_BACKEND_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_*******
```

### **Backend (`/backend/.env`)**
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
LOG_LEVEL=info
NODE_ENV=development

ACCESS_JWT_SECRET=your_secret
REFRESH_JWT_SECRET=your_refresh_secret
SALT=10

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

DATABASE_URL=postgres://user:password@localhost:5432/dbname
STRIPE_SECRET_KEY=sk_test_*******
REDIS_URL=your_upstash_redis_url
```

## 🐳 Docker Setup  
Run the entire project with Docker (Backend + Frontend + PostgreSQL + Redis)

All required Docker files are already included in the repository:

- `backend/Dockerfile`
- `frontend/Dockerfile`
- `frontend/nginx.conf`
- `docker-compose.yml`
- `.env.example`

Just follow the steps below to run the system.

### 1️⃣ Create a .env file at the root

```bash
cp .env.example .env
```
Open .env and fill in:

Stripe keys

Cloudinary keys

JWT secrets

Database credentials (already set for Docker)

### 2️⃣ Start all services

```bash
docker compose up --build
```
or in detached mode:
```bash
docker compose up -d --build
```
This will automatically start:

- `PostgreSQL`
- `Redis`
- `Backend (Bun + Express + Prisma)`
- `Frontend (Nginx + Bun build)`

### 3️⃣ Access the application

| Service     | URL                        |
|-------------|-----------------------------|
| Frontend    | http://localhost/           |
| Backend API | http://localhost:5000/api   |
| PostgreSQL  | localhost:5432              |
| Redis       | localhost:6379              |


## 🔐 Promote the First User to ADMIN

After signing up through the app (`http://localhost/signup`), promote your user to **ADMIN**(for admin privilages right now you can not do so much).

### 1️⃣ Enter PostgreSQL inside the container
```sh
docker exec -it ecommerce-db psql -U postgres -d ecommerce
```

### 2️⃣ Check existing users
```sh
SELECT * FROM users;
```

### 3️⃣ Promote a user to ADMIN
⚠️ Use single quotes, NOT double quotes.
```sh
UPDATE users
SET role = 'ADMIN'
WHERE name = 'your-name';
```

### 4️⃣ Verify
```sh
SELECT * FROM users;
```

### 5️⃣ Create a Product
go to the (`http://localhost/admin-dashboard`) (be logged in with admin user) you see you can access admin dashboard and create products , see analytics and etc

## ⭐ Support the Project

If you like this project or found it helpful, please consider giving it a **star** ⭐ on GitHub — it helps a lot!

**Built with ❤️ and lots of ☕ by Amirhosein Rajaei**