# Car Rental Marketplace: Core Idea

1. **Who lists:** Car owners list their cars with a price per day.
2. **Who books:** Customers search, filter, and request a car for a date range.
3. **A booking contains:** car, customer, start date, end date, total price, status.
4. **Launch city:** Indore only.
5. **Done when:** An owner can add a car, and a customer can find it and book it.

## Stack (locked for now)

Node.js + Express + MongoDB Atlas + Mongoose. Backend first, frontend later.

## Out of scope for now

Payments, KYC, reviews, notifications, admin panel, mobile app.

Phase 1: Seed & Verify Database
    └── Clean seed files -> Run seed -> Verify documents in MongoDB

Phase 2: Public Exploration (Customer APIs)
    ├── Step 2.1: GET /api/cars (fetch all active cars)
    ├── Step 2.2: Add Query Filters (city, fuel, transmission, maxPrice)
    └── Step 2.3: GET /api/cars/:id (fetch single car details + owner info)

Phase 3: Authentication & Security
    ├── Step 3.1: Password hashing with bcrypt (Register)
    ├── Step 3.2: JWT Token generation (Login)
    └── Step 3.3: Protect middleware (verify token) & Role check (Owner only)

Phase 4: Car Management (Owner APIs)
    ├── Step 4.1: POST /api/cars (Add new car linked to logged-in owner)
    └── Step 4.2: PUT & DELETE /api/cars/:id (Edit/Remove car)

Phase 5: The Booking Engine (Core Business Logic)
    ├── Step 5.1: Date overlap validation algorithm
    ├── Step 5.2: POST /api/bookings (Create booking request)
    └── Step 5.3: Accept / Reject / Cancel booking endpoints

Phase 6: Frontend & UI (React + Tailwind)
    └── Build customer search view -> Car details -> Owner dashboard