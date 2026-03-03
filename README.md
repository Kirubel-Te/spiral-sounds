# Spiral Sounds (Express Full-Stack App)

Spiral Sounds is a full-stack JavaScript web app for browsing vinyl records, creating an account, logging in with session auth, and managing a shopping cart.

## Tech Stack

- **Backend:** Node.js, Express 5
- **Database:** SQLite (`sqlite3` + `sqlite`)
- **Auth:** `express-session` + `bcryptjs`
- **Validation:** `validator`
- **Frontend:** Vanilla HTML/CSS/JS modules served from `public/`

## Features

- Browse all products
- Filter products by genre
- Search products by title, artist, or genre
- User registration and login
- Session-based authentication
- Add to cart, remove one item, clear cart
- Cart item count badge and cart total on checkout page

## Project Structure

```txt
ExpressFullStack/
├── server.js                 # App entrypoint
├── db/
│   └── db.js                 # SQLite connection helper
├── routes/                   # API route definitions
├── controllers/              # Route handlers/business logic
├── middleware/
│   └── requireAuth.js        # Session auth guard
├── public/                   # Static frontend files
├── data.js                   # Seed data
├── seedTable.js              # Seeds products table
├── createTable.js            # Creates cart_items table
└── logTable.js               # Logs db table contents
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```env
SPIRAL_SESSION_SECRET=replace_with_a_long_random_secret
```

### 3) Prepare the SQLite database

This app expects a `database.db` file with these tables:

- `users`
- `products`
- `cart_items`

`createTable.js` only creates `cart_items`, so create `users` and `products` first (if they do not exist), then seed products.

#### Example SQL bootstrap

You can run this in SQLite (for example with `sqlite3 database.db`):

```sql
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT,
  year INTEGER,
  genre TEXT,
  stock INTEGER NOT NULL DEFAULT 0
);
```

Then create cart table and seed products:

```bash
node createTable.js
node seedTable.js
```

Optional:

```bash
node logTable.js
```

### 4) Start the server

```bash
npm start
```

Server runs on:

- `http://localhost:8000`

## API Endpoints

### Products

- `GET /api/products` — Get all products
- `GET /api/products?genre=rock` — Filter by genre
- `GET /api/products?search=query` — Search by title/artist/genre
- `GET /api/products/genres` — Get distinct genres

### Auth

- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `GET /api/auth/logout` — Logout user
- `GET /api/auth/me/` — Check current session user

### Cart (requires authenticated session)

- `POST /api/cart/add` — Add product to cart (`{ "productId": number }`)
- `GET /api/cart/cart-count` — Get total quantity in cart
- `GET /api/cart/` — Get cart items
- `DELETE /api/cart/:itemId` — Delete one cart item
- `DELETE /api/cart/all` — Clear current user cart

## Frontend Pages

- `/` — Product listing, search, genre filtering
- `/login.html` — Login form
- `/signup.html` — Registration form
- `/cart.html` — Cart and checkout summary view

## Notes

- Session cookie is configured with `httpOnly: true`, `sameSite: "lax"`, and `secure: false` (dev-friendly default).
- If cart actions redirect to login, verify that your session is established and `.env` is configured.
