# Vaastra Workspace Instructions

Vaastra is a full-stack Assamese heritage e-commerce platform featuring sustainable clothing with rich cultural storytelling.

## Quick Reference

### Build & Run
- **Frontend Dev**: `npm run dev` (runs Vite on localhost:5173)
- **Frontend Build**: `npm run build`
- **Backend Dev**: `cd backend && npm run dev` (runs on localhost:5000)
- **Backend Test**: `cd backend && npm run test`
- **Lint Frontend**: `npm run lint`
- **Seed Database**: `cd backend && node src/utils/seeder.js`

### Stack
- **Frontend**: React 19 + Vite + React Router 7 + Framer Motion
- **Backend**: Node.js + Express 5 + Sequelize ORM + MySQL
- **Authentication**: JWT + bcryptjs
- **Payment**: Razorpay ready
- **State Management**: Context API (Auth, Cart, Toast)

---

## Architecture & Patterns

### Frontend (`src/`)

**Component Structure (Functional Components)**
- Use functional components with React Hooks
- TypeScript is configured but not yet mandatory—use JSX for now
- Follow "container/presentational" pattern: pages handle logic, components handle rendering
- Co-locate styles: create `.css` file alongside `.jsx` for each component

**Directory Organization**
- `pages/`: Full-page containers (Home, Catalog, Cart, etc.)
- `components/`: Reusable UI components with their own styles
- `context/`: Context providers (AuthContext, CartContext, ToastContext)
- `utils/api.js`: Centralized API client
- `assets/images/`: Static images and media

**Key Contexts & Hooks**
- `useAuth()`: Access `{user, login, logout, register, loading}`
- `useCart()`: Access `{items, addItem, removeItem, updateQuantity, total}`
- `useToast()`: Show notifications via `{success, error, warning, info}`
- Always check context is wrapped in provider before using custom hooks

**State Persistence**
- Auth: Stored in localStorage as `'vaastra-user'`
- Auto-restore on app mount via `useEffect`

**Animation Library**
- Use **Framer Motion** for component animations (scroll triggers, stagger effects)
- *Note*: CLAUDE.md mentions GSAP—align with Framer Motion for consistency unless complex physics required

**Styling**
- CSS modules or inline styling where appropriate
- Design tokens below drive color/spacing decisions
- Responsive via CSS media queries; mobile-first approach

### Backend (`backend/src/`)

**File Structure**
- `server.js`: Express app setup, middleware, route registration
- `config/database.js`: MySQL/Sequelize connection
- `models/`: Sequelize model definitions (User, Product, Order, etc.)
- `controllers/`: Business logic for each route
- `routes/`: Express routes grouped by resource (auth, product, cart, order, admin)
- `middleware/auth.js`: JWT verification middleware
- `services/`: (WIP) Planned for cross-model business logic
- `utils/`: Helpers (jwt.js, seeder.js, createDatabase.js)

**Authentication Flow**
1. User registers/logs in via `/api/auth/register` or `/api/auth/login`
2. Server returns JWT token (stored on frontend in localStorage)
3. Protected routes check JWT via `auth.js` middleware
4. All API calls include `Authorization: Bearer {token}` header

**API Endpoints Structure**
```
/api/auth       → AuthController (register, login, logout, getUser)
/api/products   → ProductController (getAll, getById, search)
/api/categories → CategoryController (getAll, getById)
/api/cart       → CartController (getItems, addItem, removeItem, update)
/api/orders     → OrderController (create, getHistory, getById)
/api/admin      → AdminController (dashboard, inventory, analytics)
```

**Database Models**
- User: email, password (bcrypt), name, role
- Product: name, sku, price, stock, category_id, description, images
- Category: name, description, motif_reference (e.g., "Kinkhap", "Gos")
- Cart/CartItem: user_id, product_id, quantity
- Order/OrderItem: user_id, total, status, items

**Middleware Usage**
- `auth.js` verifies JWT and attaches `req.user` to request
- Applied to protected routes (cart, order, profile endpoints)

---

## Design Tokens (Assamese Heritage)

Use these tokens consistently across UI:

**Colors**
- **Primary**: Muga Gold (`#D2B48C`) — main buttons, accents
- **Background**: Pat White (`#FDF5E6`) — page background, cards
- **Accent**: Gamosa Red (`#B22222`) — highlights, urgent actions
- **Text Dark**: `#2B2B2B` — body text
- **Text Light**: `#666666` — secondary text
- **Border**: `#E8DCC4` — dividers, subtle boundaries

**Key Motifs** (use in decorative elements)
- **Kinkhap**: Lion symbol — strength, header logos
- **Gos**: Tree symbol — nature, sustainability
- **Jaapi**: Traditional hat — craftsmanship, category icons

**Typography**
- Headings: Bold, larger line-height
- Body: Regular on light backgrounds for contrast
- Use serif fonts for headings to evoke tradition

**Spacing**
- 8px unit system: 8, 16, 24, 32, 40px gaps
- Padding/margins follow this scale

---

## Development Workflow

### Before Starting
1. **Check environment**: Ensure Node 18+ installed
2. **Install dependencies**: `npm install` (frontend), `cd backend && npm install`
3. **Setup backend**:
   - Copy `backend/.env.example` to `backend/.env.local`
   - Set `FRONTEND_URL=http://localhost:5173`
   - Create MySQL database: `CREATE DATABASE vaastra_db;`
   - Seed: `node src/utils/seeder.js`
4. **Start both**:
   - Terminal 1: `npm run dev` (frontend on 5173)
   - Terminal 2: `cd backend && npm run dev` (backend on 5000)

### Adding Features

**New Page**
1. Create file in `src/pages/YourPage.jsx`
2. Add corresponding `YourPage.css`
3. Import in `App.jsx` and add Route
4. Use `useAuth()`, `useCart()`, `useToast()` as needed

**New API Endpoint**
1. Define model in `backend/src/models/` if new table needed
2. Create controller in `backend/src/controllers/`
3. Add routes in `backend/src/routes/`
4. Register routes in `server.js`
5. Call from frontend via `api.js` client

**New Component**
1. Create `src/components/YourComponent.jsx` + `.css`
2. Use functional component + hooks
3. Accept props for data, handlers
4. Emit events via props (no two-way binding)

### Common Pitfalls

- **CORS Issues**: Backend must have `origin: 'http://localhost:5173'` in dev
- **Auth Expired**: Store token expiry time; prompt re-login if expired
- **Database Drift**: If schema changes, reset via seeder or migrations
- **Stale Context**: Always call `useAuth()` inside `<AuthProvider>`, never outside
- **CSS Conflicts**: Use distinct class names per component to avoid style leakage

---

## Code Style & Conventions

### JavaScript/React
- **Imports**: Group by third-party, then local utilities, then relative components
- **Naming**: camelCase for functions/variables, PascalCase for components/classes
- **Arrow Functions**: Prefer for callbacks and short functions
- **Destructuring**: Use early for props and object access
- **Comments**: Explain *why*, not *what*; code is self-documenting

### Example Component Pattern
```jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './MyComponent.css';

export default function MyComponent({ productId }) {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch on mount or when productId changes
    fetchData();
  }, [productId]);
  
  const fetchData = async () => {
    try {
      const response = await api.get(`/products/${productId}`);
      setData(response.data);
    } catch (error) {
      console.error('Fetch failed:', error);
    }
  };
  
  return <div className="my-component">{/* UI */}</div>;
}
```

### File Organization Within Components
1. Imports at top
2. Context/State hooks
3. Effect hooks
4. Helper functions
5. JSX return
6. CSS file in same directory

---

## Testing & Debugging

### Frontend
- **Browser DevTools**: React component tree, localStorage
- **Network Tab**: Verify API calls, tokens in Authorization header
- **Console**: Check for errors, use `console.log` for debugging

### Backend
- **Logs**: `server.js` logs all requests in development mode
- **curl/Postman**: Test endpoints with JWT header:
  ```
  curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/user
  ```
- **Database**: Use MySQL CLI or Sequelize raw queries for inspection

---

## Environment Variables

### Frontend (if needed in future)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env.local)
```
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=vaastra_db
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
RAZORPAY_KEY_ID=xxx
RAZORPAY_KEY_SECRET=xxx
```

---

## Resources & References

- **React Router v7**: [https://reactrouter.com/](https://reactrouter.com/)
- **Framer Motion**: [https://www.framer.com/motion/](https://www.framer.com/motion/)
- **Sequelize**: [https://sequelize.org/](https://sequelize.org/)
- **Express**: [https://expressjs.com/](https://expressjs.com/)
- **JWT**: [https://jwt.io/](https://jwt.io/)

**Project Documentation**: See [CLAUDE.md](../CLAUDE.md) for additional design token details.

---

## ApplyTo Patterns (Future Extensions)

If domain-specific instructions are needed later:
- `**/.github/copilot-instructions_frontend.md` → for frontend-only guidance
- `**/backend/**/.github/copilot-instructions_backend.md` → for backend-only guidance
- `**/*.test.js** → for test-specific patterns
