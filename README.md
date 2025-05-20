# MERN Stack Task Manager

A full-featured Task Management Web Application built using the **MERN stack** with **TypeScript**, featuring modern UI components via **shadcn/ui and Tailwind CSS**.

[Live Site](https://task-manager-app-iota-three.vercel.app/login)


[Resume](https://drive.google.com/file/d/1QhRlqLunyNTkN23P7pUiejaxm7AygvcZ/view)

## Tech Stack

**Frontend:**
- React with TypeScript
- Vite build tool
- TailwindCSS for styling
- shadcn/ui for accessible components
- Axios for API calls

**Backend:**
- Node.js + Express
- MongoDB with Mongoose ODM
- JWT + Bcrypt for authentication

## Features

### Authentication System
- Secure user registration/login flow
- Password strength visualization
- Protected routes with JWT verification

### Task Management
- Full CRUD operations for tasks
- Task attributes:
  - Name & Description
  - Status (Pending/In Progress/Done)
  - Priority (Low/Medium/High)
  - Creation timestamps

### UI Components
- Responsive grid layout for tasks
- Filtering by status/priority
- Sorting by date/priority/status
- Pagination for large datasets
- Visual priority indicators for each task
- Editable task details
- User-friendly error handling

## Project Structure

The project is divided into two main parts: `frontend` and `backend`.

- `frontend`: Contains all client-side code including React components, stylesheets, and configuration files.
- `backend`: Includes server logic written in Node.js using Express framework along with database interactions handled by Mongoose ORM.

## File Structure

```bash
.
├── README.md
├── task-manager-backend
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── app.ts
│   │   ├── config
│   │   │   └── db.ts
│   │   ├── controllers
│   │   │   ├── auth.controller.ts
│   │   │   └── task.controller.ts
│   │   ├── middlewares
│   │   │   ├── auth.middleware.ts
│   │   │   └── errorHandler.ts
│   │   ├── models
│   │   │   ├── task.model.ts
│   │   │   └── user.model.ts
│   │   ├── routes
│   │   │   ├── auth.routes.ts
│   │   │   └── task.routes.ts
│   │   ├── server.ts
│   │   ├── types
│   │   │   └── express
│   │   └── utils
│   │       └── asyncHandler.ts
│   └── tsconfig.json
└── task-manager-frontend
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── public
    ├── README.md
    ├── src
    │   ├── api
    │   │   ├── auth.ts
    │   │   ├── axios.ts
    │   │   └── task.ts
    │   ├── App.tsx
    │   ├── assets
    │   ├── components
    │   │   ├── DeleteDialog.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── ProtectedRoute.tsx
    │   │   ├── PublicRoute.tsx
    │   │   ├── TaskCard.tsx
    │   │   ├── TaskList.tsx
    │   │   └── ui
    │   ├── context
    │   │   ├── AuthContext.tsx
    │   │   └── AuthProvider.tsx
    │   ├── hooks
    │   │   └── useAuth.ts
    │   ├── index.css
    │   ├── lib
    │   │   └── utils.ts
    │   ├── main.tsx
    │   ├── pages
    │   │   ├── AddTask.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── EditTask.tsx
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   └── Task.tsx
    │   ├── routes
    │   ├── types
    │   │   └── task.ts
    │   ├── utils
    │   │   └── toast.ts
    │   └── vite-env.d.ts
    ├── tailwind.config.cjs
    ├── tsconfig.json
    └── vite.config.ts

```


### Key Directories:

**Backend:**
- `controllers/`: Business logic for routes
- `models/`: MongoDB schemas and interfaces
- `routes/`: API endpoint definitions
- `middlewares/`: Authentication and error handling
- `utils/`: Reusable utility functions

**Frontend:**
- `components/`: Reusable UI components
- `pages/`: Route-based components
- `api/`: Axios API clients
- `hooks/`: Custom React hooks
- `context/`: Authentication context
- `types/`: TypeScript type definitions






## Installation

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- pnpm (or npm/yarn)

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Abhishek1334/task-manager-app.git
cd task-manager-app


```
2. Install dependencies:
```bash
# Frontend
cd task-manager-app/frontend
pnpm install

# Backend 
cd task-manager-app/backend
pnpm install
```

3. Configure environment variables:
```bash
//Create frontend/.env:

VITE_API_BASE_URL=http://localhost:5000/api

// Create backend/.env:

PORT=5000
MONGODB_URI="https://your-mongodb-uri"
JWT_SECRET=your-secret-key-here

```

1. Run the application:
 ```bash
// In one terminal window, start the backend server:
cd backend
npm run dev

// In another terminal window, start the frontend development server:
cd ../frontend
npm run dev
```
	The app should now be running at http://localhost:5173.
