---
description: Initialize and understand the Vaastra e-commerce project
---

# Project Initialization

// turbo-all

## 1. Install Frontend Dependencies
```bash
cd c:\Users\mriga\Vaastra && npm install
```

## 2. Install Backend Dependencies
```bash
cd c:\Users\mriga\Vaastra\backend && npm install
```

## 3. Database Setup
Ensure MySQL is running locally, then create the database:
```bash
cd c:\Users\mriga\Vaastra\backend && node src/utils/createDatabase.js
```

## 4. Seed Database (Optional)
Populate with sample product data:
```bash
cd c:\Users\mriga\Vaastra\backend && node src/utils/seeder.js
```

## 5. Start Backend Server
```bash
cd c:\Users\mriga\Vaastra\backend && npm run dev
```
Backend runs on http://localhost:5000

## 6. Start Frontend Dev Server
```bash
cd c:\Users\mriga\Vaastra && npm run dev
```
Frontend runs on http://localhost:5173

## Project Structure

```
Vaastra/
├── src/                    # React frontend (Vite)
│   ├── components/         # Reusable UI components (11 files)
│   ├── pages/              # Page views (9 pages)
│   ├── context/            # Auth, Cart, Toast providers
│   ├── utils/api.js        # Centralized API service
│   └── data/mockData.js    # Mock product data
├── backend/                # Express.js API server
│   └── src/
│       ├── models/         # Sequelize models (User, Product, Order, etc.)
│       ├── routes/         # REST API routes (auth, products, cart, orders, admin)
│       ├── controllers/    # Business logic
│       ├── middleware/     # JWT auth middleware
│       ├── config/         # Database connection
│       └── utils/          # DB creation, seeder, JWT helpers
└── public/                 # Static assets
```

## Design System (Assamese Heritage)
- **Primary:** Muga Gold `#D2B48C`
- **Background:** Pat White `#FDF5E6`
- **Accent:** Gamosa Red `#B22222`
- **Animations:** framer-motion
- **Icons:** lucide-react
