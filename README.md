# Finance Dashboard Backend

A logically structured backend for a finance dashboard system built with Node.js, Express, and MongoDB.

## Features
- **User & Role Management**: Multi-role support (Viewer, Analyst, Admin).
- **Financial Records**: Full CRUD operations for transactions with advanced filtering.
- **Dashboard Analytics**: Summary statistics, category totals, and recent activity.
- **Role-Based Access Control (RBAC)**: Secure access using JWT and custom role guards.
- **Robust Error Handling**: Standardized error responses and input validation.

## Tech Stack
- **Runtime**: Node.js (ES6 Modules)
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT, bcryptjs, RBAC Middleware
- **Environment**: dotenv, CORS

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Environment Variables:
   Create a `.env` file in the root directory (refer to `.env.example`).

3. Start the server:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Documentation

### Auth
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get token
- `GET /api/v1/auth/me` - Get current user profile

### Dashboard (Protected)
- `GET /api/v1/dashboard/summary` - Get total income, expenses, and balance
- `GET /api/v1/dashboard/categories` - Get category-wise breakdown
- `GET /api/v1/dashboard/recent` - Get last 5 transactions

### Records (Protected)
- `GET /api/v1/records` - View all records (Filters: amount[gt/lt], type, category)
- `POST /api/v1/records` - Create new record (Admin)
- `PUT /api/v1/records/:id` - Update record (Admin)
- `DELETE /api/v1/records/:id` - Delete record (Admin)

### Users (Admin Only)
- `GET /api/v1/users` - List all users
- `PUT /api/v1/users/:id` - Update user role or status
- `DELETE /api/v1/users/:id` - Remove user

## Role Matrix
| Action | Viewer | Analyst | Admin |
| :--- | :---: | :---: | :---: |
| View Profile | ✅ | ✅ | ✅ |
| View Records | ✅ | ✅ | ✅ |
| View Dashboards | ✅ | ✅ | ✅ |
| Manage Records | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |

## Design Decisions
- **Separation of Concerns**: Follows Routes -> Controllers -> Models pattern.
- **Security**: Passwords are never returned in queries (`select: false`). JWT is used for sessionless auth.
- **Scalability**: MongoDB aggregation is used for dashboard stats to ensure performance with large datasets.
