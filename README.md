# 🛍️ NICE GADGETS

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3FCF8E?logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-Deployed-46E3B7?logo=render&logoColor=black" />
</p>

<p align="center">
  <b>A modern e-commerce platform for discovering and shopping for gadgets.</b>
</p>

<p align="center">
  🌐 <a href="https://nicegadgets.online">Live Website</a> •
  💻 <a href="https://github.com/Localhost-Enterprises/group-project-2026">GitHub Repository</a>
</p>

---

## 📖 About the Project

**NICE GADGETS** is a responsive e-commerce web application developed as a collaborative group project.

The platform provides a convenient shopping experience with a product catalog, detailed product pages, and an intuitive interface for exploring electronic devices and accessories.

The project focuses on modern frontend development practices, reusable components, efficient state management, and integration with backend services.

## ✨ Features

- **Product Catalog** — browse products across different categories.
- **Product Details** — explore individual products and their specifications.
- **Product Variants** — view available colors and storage capacities.
- **Shopping Cart** — add products to your cart.
- **Product Discovery** — explore new models and featured products.
- **Responsive Design** — optimized for different screen sizes.
- **Internationalization** — multilingual support.
- **Interactive UI** — sliders, product galleries, and dynamic components.

## 🖥️ Screenshots

<div align="center">
  <h3>🏠 Homepage</h3>
  <img src="docs/screenshots/homepage.png" width="90%" alt="Homepage" />

  <h3>📱 Product Catalog</h3>
  <img src="docs/screenshots/catalog.png" width="90%" alt="Product Catalog" />

  <h3>📦 Product Details</h3>
  <img src="docs/screenshots/product-details.png" width="90%" alt="Product Details" />

  <h3>🛒 Checkout</h3>
  <img src="docs/screenshots/checkout.png" width="90%" alt="Checkout" />
</div>

## 🛠️ Tech Stack

### Frontend

| Technology        | Description                 |
| ----------------- | --------------------------- |
| React 19          | Component-based UI library  |
| TypeScript        | Static type checking        |
| Vite 8            | Frontend build tool         |
| Tailwind CSS 4    | Utility-first CSS framework |
| Sass              | CSS preprocessing           |
| Styled Components | Component-level styling     |
| React Router 7    | Application routing         |
| Swiper            | Interactive sliders         |

### State Management & Backend

| Technology     | Description                   |
| -------------- | ----------------------------- |
| Zustand        | Global state management       |
| TanStack Query | Server-state management       |
| Supabase       | Backend and database services |
| EmailJS        | Email integration             |
| i18next        | Internationalization          |

### Code Quality & Development

- ESLint
- Prettier
- Husky
- TypeScript

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Localhost-Enterprises/group-project-2026.git
```

### 2. Navigate to the project directory

```bash
cd group-project-2026
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory.

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Replace the placeholder values with your Supabase project credentials.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite, usually:

```text
http://localhost:5173
```

## 📜 Available Scripts

| Command                | Description                         |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Start development server            |
| `npm run build`        | Type-check and build for production |
| `npm run preview`      | Preview production build            |
| `npm run typecheck`    | Run TypeScript checks               |
| `npm run lint`         | Run ESLint with automatic fixes     |
| `npm run lint:check`   | Check code with ESLint              |
| `npm run format`       | Format code with Prettier           |
| `npm run format:check` | Check code formatting               |
| `npm run fix-style`    | Run formatting and linting          |
| `npm run check`        | Run all code quality checks         |
| `npm test`             | Run automated tests                 |

## 📁 Project Structure

```text
group-project-2026/
│
├── .github/             # GitHub configuration
├── .husky/              # Git hooks
├── public/              # Static assets
├── src/                 # Application source code
├── tests/               # Automated tests
│
├── .env.example         # Environment variables template
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── render.yaml          # Render deployment configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # Project documentation
```

## 🚢 Deployment & Continuous Integration

The project is deployed on **Render** as a Static Site.

🔗 **Live Application:** https://nicegadgets.online

### Automatic Deployment

The repository is connected to Render, enabling automatic deployment when changes are pushed to the configured deployment branch.

The deployment workflow:

1. Developers push changes to GitHub.
2. Render detects the new commit.
3. Dependencies are installed.
4. The production build is generated.
5. The updated application is published automatically.

### Build Configuration

The deployment configuration is defined in `render.yaml`.

**Build command:**

```bash
npm ci && npm run build
```

**Publish directory:**

```text
dist
```

The application also uses URL rewriting to support client-side routing.

No manual deployment is required for regular updates when automatic deployment is enabled.

## 🔐 Environment Variables

The application requires the following environment variables:

| Variable                        | Description              |
| ------------------------------- | ------------------------ |
| `VITE_SUPABASE_URL`             | Supabase project URL     |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key |

**Security note:** Never commit private credentials or secret API keys to the repository.

## 👥 Team

Developed by **Localhost Enterprises** as part of a collaborative software development project.

**Organization:** [Localhost Enterprises](https://github.com/Localhost-Enterprises)

**Repository:** [group-project-2026](https://github.com/Localhost-Enterprises/group-project-2026)

## 📄 License

No license has been specified for this project yet.

---

<p align="center">
  <b>NICE GADGETS</b>
  <br />
  Discover technology. Explore possibilities.
  <br /><br />
  Made with ❤️ by Localhost Enterprises
</p>
