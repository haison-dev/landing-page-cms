# Landing Page CMS

A production-grade, highly scalable full-stack Content Management System tailored for creating, managing, and publishing modern landing pages. The project leverages a robust TypeScript foundation across both backend and frontend, ensuring type safety and maintainability.

## 🚀 Tech Stack

### Frontend
| Technology | Description |
|---|---|
| **React 18** | Core UI library |
| **Vite** | Extremely fast development server and bundler |
| **TypeScript** | Strict type-checking and developer experience |
| **Tailwind CSS** | Utility-first CSS framework for rapid styling |
| **React Query v5** | Server-state management and caching |
| **Zustand** | Lightweight global client-state management |
| **React Hook Form & Zod** | Form handling and validation |
| **Monaco Editor** | Embedded code editor for raw HTML/CSS/JS manipulation |

### Backend
| Technology | Description |
|---|---|
| **Node.js & Express** | Fast and minimalist web server |
| **TypeScript** | Strongly typed backend logic |
| **MongoDB & Mongoose** | NoSQL Database and ODM |
| **Zod** | Schema declaration and payload validation |
| **JWT & bcryptjs** | Authentication and security |
| **Cloudinary** | Image and media asset hosting |

---

## 🏗 Architecture Overview

### Backend Architecture
The backend is structured using an **N-Tier Layered Architecture** to separate concerns, making it easier to test and scale:
- **Routes (`/routes`)**: Maps HTTP endpoints to specific controllers.
- **Controllers (`/controllers`)**: Handles incoming HTTP requests, invokes the Service layer, and sends HTTP responses.
- **Services (`/services`)**: Contains all core business logic and database interactions. Ensures controllers remain thin and focused solely on request parsing.
- **Models (`/models`)**: Defines MongoDB schemas with proper indexing (`industryId`, `status`, etc.) to optimize query performance.
- **Middlewares (`/middlewares`)**: Includes Zod payload validation, JWT authentication guards, and centralized async error handling (`AppError`).

### Frontend Architecture
The frontend utilizes a **Feature-Driven Structure**:
- **Features (`/features`)**: Encapsulates components, hooks, and localized state by domain (e.g., `auth`, `landing-pages`, `industries`).
- **Components (`/components`)**: Contains shared UI elements, divided into `/ui` (primitive elements), `/admin` (admin specific layouts), and `/public` (public-facing views).
- **API Layer (`/api`)**: Axios instances mapped to corresponding backend domains.
- **Pages (`/pages`)**: Route-level components. All pages are heavily optimized with `React.lazy` and `Suspense` for code splitting.

---

## 📁 Directory Structure

```text
landing-pageCMS/
├── backend/
│   ├── src/
│   │   ├── config/        # Environment configurations
│   │   ├── controllers/   # Request/Response handlers
│   │   ├── middlewares/   # Express middlewares (Auth, Error, Validation)
│   │   ├── models/        # Mongoose database schemas
│   │   ├── routes/        # API route definitions
│   │   ├── services/      # Core business logic layer
│   │   ├── utils/         # Helper functions (JWT, Error classes)
│   │   └── server.ts      # Application entry point
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/           # API integration layer (Axios)
    │   ├── components/    # Reusable UI components
    │   ├── features/      # Domain-specific logic and hooks
    │   ├── hooks/         # Shared custom React hooks
    │   ├── lib/           # Utility libraries (tailwind-merge, etc.)
    │   ├── pages/         # Route definitions (Lazy loaded)
    │   ├── store/         # Zustand global stores
    │   ├── types/         # Global TypeScript interfaces
    │   ├── App.tsx        # React Router configuration
    │   └── main.tsx       # React DOM entry point
    └── package.json
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (Local instance or MongoDB Atlas)
- **Cloudinary Account** (For media uploads)

### 2. Environment Variables
Create a `.env` file in both the `backend` and `frontend` directories based on the `.env.example` templates.

**Backend (`backend/.env`)**
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname
ACCESS_TOKEN_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=securepassword
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Installation & Database Seeding

1. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Seed the database (Backend)**
   ```bash
   cd backend
   npm run seed:admin  # Creates the default admin account based on .env credentials
   npm run seed        # (Optional) Seeds sample templates and industries
   ```

### 4. Development Workflow
To start the development servers concurrently, open two terminal tabs:

**Terminal 1 (Backend)**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend)**
```bash
cd frontend
npm run dev
```

---

## 🛠 Available Scripts

### Backend
- `npm run dev`: Starts the server in watch mode using `tsx`.
- `npm run build`: Compiles TypeScript to JavaScript in the `/dist` directory.
- `npm start`: Runs the compiled production code.
- `npm run seed:admin`: Injects the initial admin credentials.

### Frontend
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Type-checks and bundles the application for production.
- `npm run preview`: Previews the production build locally.

---

## ⚡ Performance Optimizations

1. **Database Indexing**: Critical MongoDB fields (`industryId`, `status`) are indexed to ensure quick filtering and `$lookup` operations.
2. **Lean Population**: Mongoose `.populate()` calls are strictly scoped to necessary fields (e.g., `name`, `slug`) to prevent memory bloating.
3. **Lazy Loading**: All React Router pages are wrapped in `React.lazy` and `<Suspense>`, significantly reducing the initial bundle size.
4. **React Memoization**: Heavy admin components, particularly the Monaco Editor instances, are wrapped in `React.memo` to prevent unnecessary DOM recalculations during parent state updates.

---

## 🐛 Troubleshooting

- **CORS Errors**: Ensure the `CLIENT_URL` in the backend `.env` matches the exact URL of your running frontend application (including the port).
- **MongoDB Connection Refused**: Verify that your IP address is whitelisted in MongoDB Atlas, and the `MONGODB_URI` string is correctly formatted.
- **Media Uploads Failing**: Double-check your Cloudinary API credentials. Note that Cloudinary has strict file size limits on the free tier.
- **TypeScript Errors During Build**: Run `npx tsc --noEmit` in either directory to locate exact typing mismatches.
