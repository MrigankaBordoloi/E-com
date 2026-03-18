# Vaastra Backend API

Node.js + Express + MySQL backend for Vaastra e-commerce platform.

## Features

- 🔐 JWT Authentication
- 📦 Product Management
- 🛒 Shopping Cart
- 📝 Order Management
- 👤 Admin Dashboard
- 📊 Inventory Tracking
- 💳 Razorpay Integration Ready

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create MySQL database:
```sql
CREATE DATABASE vaastra_db;
```

3. Configure environment variables:
```bash
cp .env .env.local
# Edit .env with your database credentials
```

4. Seed database:
```bash
node src/utils/seeder.js
```

5. Start server:
```bash
npm run dev
```

Server runs on http://localhost:5000

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/user
- PUT /api/auth/profile

### Products
- GET /api/products
- GET /api/products/:id

### Categories
- GET /api/categories

### Cart
- GET /api/cart
- POST /api/cart
- PUT /api/cart/:id
- DELETE /api/cart/:id

### Orders
- POST /api/orders
- GET /api/orders
- GET /api/orders/:id
- PUT /api/orders/:id/cancel
- PUT /api/orders/:id/payment

### Admin (requires admin role)
- GET /api/admin/dashboard
- GET /api/admin/products
- POST /api/admin/products
- PUT /api/admin/products/:id
- DELETE /api/admin/products/:id
- PUT /api/admin/products/:id/stock
- GET /api/admin/orders
- PUT /api/admin/orders/:id/status
- GET /api/admin/inventory

## Default Credentials

- Admin: admin@vaastra.com / admin123
- Demo User: demo@vaastra.com / demo123
