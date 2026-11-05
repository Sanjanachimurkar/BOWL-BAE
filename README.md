# 🥣 BOWL BAE — Fresh Indian Salad Bowls
> **“Garden Meets Tadka.”**  
> Fresh Indian salad bowls with big flavour. Raw seasonal crunch awakened by the theatre of sizzling whole spices.

Inspired by clean, image-first editorial aesthetics (like JuiceBot.com): oversized typography, pale pistachio green and warm cream backgrounds, minimal navigation, full-page ingredient imagery, and smooth storytelling.

---

## 🥗 Brand Concept
Bowl Bae sells fresh Indian salad bowls using seasonal vegetables, grains, paneer, chickpeas, sprouts, chutneys, herbs, and Indian spices. 

### 🎨 Exact JuiceBot Visual System
- **Sage Green Section** (`#b2bea5`): Hero with stacked headline `Garden / Meets / Tadka` and CTA buttons.
- **Warm Golden Beige Section** (`#e3cba5`): Manifesto `Fresh, Not Boring` with clean editorial frame.
- **Warm Terracotta Salmon Section** (`#daad9d`): `4 Hours vs. 40 Days` (Chopped today. Devoured today.) + `Enter: The Modern Indian Bowl`.
- **Warm Limestone Gray Section** (`#e1dcd6`): `The Salad Journey` 4-stage alternating cards + giant statement `Farm. Chop. Tadka. Bowl.`
- **Micro-Kitchen Menu & Customizer** (`#e3cba5` / `#b2bea5`): 5 Signature Bowls & Build Your Own Bowl with crisp 2px/3px black border cards and macro profiles.
- **Organic Grain Texture**: Subtle tactile texture overlay on all sections matching JuiceBot's `bg-texture.png`.
- **Typography & Details**: Syne & Plus Jakarta Sans bold display geometry, signature animated underline hover (`.jb-link`), and near-black selection (`#292929`).

---

## 🛠 Tech Stack

- **Frontend**: React 19 with Vite, Tailwind CSS, Framer Motion, and **Bespoke Handcrafted SVG Illustrations** *(Zero Lucide React / third-party icon bloat for maximum performance)*
- **Styling & Assets**: Custom WebP raster pipeline, JuiceBot typographic design system (`blamo` fonts), and pure SVG artwork
- **Backend**: Node.js & Express REST API with strict security middleware (Helmet, NoSQL injection prevention, rate limiting, and honeypot protection)
- **Database**: MongoDB with Mongoose (with automated memory fallback for testing)
- **Architecture**: Decoupled `client` and `server` architecture with automated API proxying

---

## 📁 Project Structure

```
BOWL BAE/
├── client/                     # Frontend React + Vite + Tailwind application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Brand logo & editorial overlay navigation
│   │   │   ├── Hero.jsx                # "Meet Our Salad" top-down artisanal bowl animation
│   │   │   ├── Story.jsx               # "Fresh, not boring" manifesto
│   │   │   ├── Freshness.jsx           # "4 Hours vs. 40 Days" scroll-driven produce gathering
│   │   │   ├── SaladMotionStage.jsx    # Interactive live bowl layer-toss stage
│   │   │   ├── Process.jsx             # "Farm. Chop. Tadka. Bowl." 4-step ritual
│   │   │   ├── Menu.jsx                # 5 Signature Bowls & filters
│   │   │   ├── BowlModal.jsx           # Nutrition, ingredients, macros & add-to-bag
│   │   │   ├── CustomizerModal.jsx     # Build Your Own Bowl interactive studio
│   │   │   ├── RecipesPage.jsx         # Signature salad dressing & meal recipes
│   │   │   ├── Sourcing.jsx            # Transparent farms & clean kitchen pledge
│   │   │   ├── TopicIllustrations.jsx  # Bespoke handcrafted SVG illustrations (No Lucide)
│   │   │   ├── Cutouts.jsx             # Organic cutouts & delivery truck graphics
│   │   │   ├── CartDrawer.jsx          # Live bag, honeypot protection & checkout form
│   │   │   ├── OrderSuccessModal.jsx   # Real-time kitchen status tracker
│   │   │   ├── OrderLookupModal.jsx    # Track order by ID (e.g. BAE-2925) or phone
│   │   │   ├── Newsletter.jsx          # "The Tadka Dispatch" signup
│   │   │   └── Footer.jsx              # Editorial footer, allergens, timings
│   │   ├── data/
│   │   │   └── fallbackBowls.js        # Default bowls data
│   │   ├── App.jsx                     # Root component & state synchronization
│   │   ├── index.css                   # Tailwind base & motion safety
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js                  # Includes /api proxy to port 5000
│   └── package.json
│
├── server/                     # Backend Express REST API
│   ├── config/
│   │   └── db.js                       # Mongoose connection & auto-seed handler
│   ├── data/
│   │   └── seedBowls.js                # Initial 5 signature bowls dataset
│   ├── models/
│   │   ├── Bowl.js                     # Bowl Mongoose model
│   │   ├── Order.js                    # Order Mongoose model
│   │   └── NewsletterSubscriber.js     # Newsletter subscriber model
│   ├── routes/
│   │   ├── bowls.js                    # GET /api/bowls & GET /api/bowls/:id
│   │   ├── orders.js                   # POST /api/orders & GET /api/orders/:id
│   │   └── newsletter.js               # POST /api/newsletter
│   ├── scripts/
│   │   └── seed.js                     # Standalone CLI seeding script
│   ├── .env.example
│   ├── .env
│   ├── server.js                       # Express app entry point
│   └── package.json
│
├── package.json                # Root convenience scripts
└── README.md
```

---

## 🚀 Quick Setup & Run Instructions

### 1. Prerequisites
- **Node.js** v18+ (tested with v24)
- **MongoDB** (running locally on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)

### 2. Backend Setup
1. Navigate to `server`:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (`server/.env`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/bowl_bae
   NODE_ENV=development
   ```
4. Seed the initial 5 signature bowls:
   ```bash
   npm run seed
   ```
   *(Note: The server also auto-seeds automatically on initial startup if the database is empty!)*
5. Start the backend API server:
   ```bash
   npm start
   # or with auto-reload:
   npm run dev
   ```
   Server will run at **http://localhost:5000**.

### 3. Frontend Setup
1. Open a new terminal and navigate to `client`:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The client will run at **http://localhost:3000** (or Vite default port) with automatic proxying to the backend API!

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/bowls` | List all available bowls with nutritional data and tags |
| `GET` | `/api/bowls/:id` | Get single bowl details by MongoDB `_id` or slug (e.g. `tandoori-chickpea-crunch`) |
| `POST` | `/api/orders` | Place a customer order with validation, taxes, and auto-generated `orderNumber` |
| `GET` | `/api/orders/:id` | Retrieve real-time status of an order by `orderNumber` (e.g. `BAE-2925`) or `_id` |
| `POST` | `/api/newsletter` | Subscribe email to *The Tadka Dispatch* newsletter |
| `GET` | `/api/health` | Health check route with database connection status |

### Sample `POST /api/orders` Request Body
```json
{
  "customer": {
    "name": "Priyanshu Mehta",
    "email": "priyanshu@example.com",
    "phone": "+91 98765 43210",
    "address": "Flat 302, Green Acre Apartments, Bandra West, Mumbai",
    "landmark": "Near Carter Road Promenade",
    "instructions": "Leave at door, ring bell once."
  },
  "items": [
    {
      "bowlId": "65b9e...",
      "slug": "tandoori-chickpea-crunch",
      "name": "Tandoori Chickpea Crunch",
      "price": 360,
      "quantity": 2,
      "customizations": {
        "spiceLevel": "Classic Balanced",
        "specialNotes": "Extra pomegranate pearls"
      }
    }
  ],
  "paymentMethod": "pay_on_delivery"
}
```

---

## 🥗 The 5 Signature Bowls Included
1. **Tandoori Chickpea Crunch** (₹360) — Slow-roasted chickpeas, baby spinach, cucumber ribbons, pomegranate, flaxseed sev, mustard & mint vinaigrette.
2. **Mumbai Chaat Bowl** (₹340) — Sprouted green moong, sweet potato, raw mango ribbons, amaranth crunch, zero-sugar date-tamarind reduction.
3. **Punjabi Power Bowl** (₹420) — Char-grilled A2 malai paneer (27g protein), brown basmati, massaged kale, candy beetroot, hot hing-jeera ghee tadka.
4. **South Indian Protein Bowl** (₹390) — Steamed edamame, sundal chickpeas, fresh coconut ribbons, heirloom red rice, sputtered mustard & curry leaf oil.
5. **Build Your Own Bowl** (₹410) — Interactive studio allowing bespoke choice of 2 bases, prime protein, 4 farm toppings, and custom tempered tadka dressing.
