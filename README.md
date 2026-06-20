# Alitas Express Backend

## Overview

Alitas Express Backend is a RESTful API built to support the Alitas Express online ordering platform. The backend handles customer order submissions, validates incoming data, manages business logic, and stores order information in a PostgreSQL database.

The API serves as the bridge between the frontend ordering website and the database, providing a scalable and maintainable architecture for restaurant order management.

---

## Features

### Order Management

* Create customer orders
* Retrieve existing orders
* Update order status
* Delete orders
* Store customer delivery information
* Manage wing flavor selections
* Track order creation timestamps

### API Features

* RESTful API architecture
* Request validation
* Error handling
* Database integration
* JSON-based responses
* Scalable backend structure

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Prisma ORM

### Development Tools

* Git
* GitHub
* npm
* Postman
* Nodemon

---

## System Architecture

```text
Customer Browser
       │
       ▼
React + Next.js Frontend
       │
       ▼
REST API Requests
       │
       ▼
Node.js + Express Backend
       │
       ▼
Prisma ORM
       │
       ▼
PostgreSQL Database
```

---

## Project Structure

```text
alitas-express-backend
│
├── prisma
│   └── schema.prisma
│
├── src
│   ├── server.js
│   │
│   ├── routes
│   │   └── orderRoutes.js
│   │
│   ├── controllers
│   │   └── orderController.js
│   │
│   └── db
│       └── prisma.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## API Endpoints

### Create Order

```http
POST /api/orders
```

### Get All Orders

```http
GET /api/orders
```

### Get Order By ID

```http
GET /api/orders/:id
```

### Update Order Status

```http
PATCH /api/orders/:id
```

### Delete Order

```http
DELETE /api/orders/:id
```

---

## Example Order Payload

```json
{
  "customerName": "John Doe",
  "phoneNumber": "(555) 123-4567",
  "deliveryAddress": "123 Main Street",
  "flavor": "Mango Habanero",
  "quantity": 20
}
```

---

## Database Schema

### Orders Table

| Column           | Data Type          |
| ---------------- | ------------------ |
| id               | SERIAL PRIMARY KEY |
| customer_name    | VARCHAR(100)       |
| phone_number     | VARCHAR(20)        |
| delivery_address | TEXT               |
| flavor           | VARCHAR(50)        |
| quantity         | INTEGER            |
| order_status     | VARCHAR(20)        |
| created_at       | TIMESTAMP          |

---

## Getting Started

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/alitas_express"
PORT=5000
```

### Run Prisma Migration

```bash
npx prisma migrate dev
```

### Start Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

---

## Future Enhancements

* Admin dashboard integration
* Authentication and authorization
* Customer accounts
* Online payment processing
* SMS notifications
* Email confirmations
* Order tracking
* Inventory management
* Analytics and reporting
* Delivery status updates

---

## License

This project was developed as a full-stack restaurant ordering application for educational, portfolio, and demonstration purposes.
