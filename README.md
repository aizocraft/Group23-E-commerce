
# E-Commerce Backend API

## Overview

This is the backend for an E-commerce application built using Node.js, Express, MongoDB, and JWT for user authentication. It handles user registration, login, product management, order management, and order processing. The backend follows RESTful principles and uses MongoDB as the database.

### Table of Contents

    Features
    Technologies
    Setup Instructions
    API Endpoints
    Testing with Insomnia
    Directory Structure
    License

### Features

 ## User Management
      -  Register a new user
      -  User login with JWT token
      -  Authentication and Authorization

## Product Management
       - List all products
       - Get product by ID
       - Admin can add, update, and delete products

## Order Management
       - Create an order
       - View order details
       - Mark orders as paid
       - Mark orders as delivered

### Technologies

    Node.js - JavaScript runtime
    Express - Web framework for Node.js
    MongoDB - NoSQL database for storing user, product, and order data
    JWT (JSON Web Token) - Used for user authentication and authorization
    Mongoose - MongoDB object modeling tool
    Nodemon - Development tool to auto-restart the server on file changes

### Setup Instructions

Follow these steps to get the backend up and running locally.
Prerequisites

    Node.js (version >= 14.x)
    MongoDB (installed and running locally, or use MongoDB Atlas)
    Git (for version control)

1. Clone the repository

```bash
  git clone https://github.com/aizocraft/Group23-E-commerce.git
cd Group23-E-commerce
```

2. Install dependencies
```bash
cd backend
npm install
```

3. Configure environment variables

Create a .env file in the backend directory with the following configuration:

```bash
MONGO_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your_jwt_secret
PORT = 5000
```
    MONGO_URI: Your MongoDB connection string (local or MongoDB Atlas).
    JWT_SECRET: Secret key used for signing JWT tokens.

4. Start the server
```bash
npm start
```

The server will be running on http://localhost:5000.

## API Endpoints

### User Routes

    POST /api/users/register - Register a new user
    POST /api/users/login - Log in and return JWT token

### Product Routes

    GET /api/products - Get a list of all products
    GET /api/products/:id - Get a product by ID
    POST /api/products - Admin: Add a new product
    PUT /api/products/:id - Admin: Update a product
    DELETE /api/products/:id - Admin: Delete a product

### Order Routes

    POST /api/orders - Create a new order
    GET /api/orders/:id - Get order details by ID
    PUT /api/orders/:id/pay - Admin: Mark an order as paid
    PUT /api/orders/:id/deliver - Admin: Mark an order as delivered


Testing with Insomnia

You can use Insomnia to test the API endpoints. Below is a step-by-step guide.
### 1. Register User
```bash
Method: POST
URL: http://localhost:5000/api/users/register
Body (JSON):

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### 2. Login User

```bash
Method: POST
URL: http://localhost:5000/api/users/login
Body (JSON):

{
  "email": "john@example.com",
  "password": "password123"
}
```

This will return a JWT token, which is needed for authenticated requests.

### 3. Create Order
```bash
Method: POST
URL: http://localhost:5000/api/orders
Headers:

    Authorization: Bearer <your-jwt-token> (replace <your-jwt-token> with the JWT token you received from login)

Body (JSON):

{
  "orderItems": [
    {
      "product": "67c1b119638c201df10a4bfc",  // Example product ID
      "qty": 2
    }
  ],
  "shippingAddress": {
    "address": "156 Another St",
    "city": "Kisii",
    "postalCode": "94105",
    "country": "Kenya"
  },
  "paymentMethod": "Credit Card"
}
```

### 4. View Order
```bash
Method: GET
URL: http://localhost:5000/api/orders/:id (replace :id with the actual order ID)

Headers:

    Authorization: Bearer <your-jwt-token>
```
### 5. Mark Order as Paid (Admin Only)
```bash
Method: PUT
URL: http://localhost:5000/api/orders/:id/pay (replace :id with the actual order ID)

Headers:

 Authorization: Bearer <your-admin-jwt-token>
```

### 6. Mark Order as Delivered (Admin Only)
```bash
Method: PUT
URL: http://localhost:5000/api/orders/:id/deliver (replace :id with the actual order ID)

Headers:

    Authorization: Bearer <your-admin-jwt-token>
```

### Directory Structure

```bash
Group23-E-commerce/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```
```bash
    server.js: The entry point for the backend server.
    models/: Contains Mongoose models for User, Product, and Order.
    controllers/: Contains logic for handling requests for products, orders, and users.
    routes/: Defines the routes for user, product, and order endpoints.
    config/db.js: The database connection file.
  ```