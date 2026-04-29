# 💸 Budgetly — Smart Expense Tracker

A full-stack personal finance tracker that helps you manage income, expenses, and budgets with real-time insights and analytics.

---

## 🧱 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- Recharts / Chart.js

**Backend**
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- JSON Web Token (JWT)
- bcrypt.js

<!-- **Deployment**
- Frontend → Vercel
- Backend → Render -->

---

## ⚙️ Features

**Core**
- User registration and login
- Add, edit, and delete transactions
- Income and expense tracking
- Category tagging per transaction
- Monthly summary overview

**Analytics**
- Pie chart — expense breakdown by category
- Bar chart — monthly income vs expense comparison
- Category-wise spending view

**Smart Features**
- Budget limits per category
- Overspending alerts
- Auto category suggestion (rule-based)
- Monthly spending insights

**UI/UX**
- Dark mode
- Responsive design
- Search transactions
- Filter by date and category
- Dashboard overview cards

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/your-username/budgetly.git
cd budgetly
```

### 2. Setup the backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend server:
```bash
node server.js
# or with nodemon
nodemon server.js
```

### 3. Setup the frontend
```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📁 Project Structure

```
budgetly/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Transaction.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── transactions.js
│   └── server.js
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AddExpense.jsx
│   │   ├── ExpenseCard.jsx
│   │   └── navbar.jsx
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   │   ├── login.jsx
│   │   ├── profile.jsx
│   │   ├── Register.jsx
│   │   └── Transaction.jsx
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── README.md
```

---

## 🔐 API Endpoints

**Auth**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

**Transactions** *(protected — requires Bearer token)*
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions` | Add a new transaction |
| PUT | `/api/transactions/:id` | Edit a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |

---

## 🌐 Deployment

<!-- **Backend on Render**
- Set environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`) in Render dashboard
- Deploy from your GitHub repo

**Frontend on Vercel**
- Connect your GitHub repo to Vercel
- Set the root directory to `frontend`
- Vercel auto-detects Vite and deploys -->

---
## 🚧 Work in Progress

The following features are planned and currently being developed:

- [ ] Analytics page (pie chart, bar chart, category breakdown)
- [ ] Budgets page (monthly limits per category, overspending alerts)
- [ ] Dark mode toggle
- [ ] Filter by date range
- [ ] Auto category suggestion
- [ ] Monthly spending insights
- [ ] Profile page
- [ ] Responsive mobile design

---
## 📄 License

© 2025 Nuha Rilwan. All rights reserved.