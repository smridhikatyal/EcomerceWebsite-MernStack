# EcomerceWebsite-MernStack
E-Commerce Website
Welcome to the E-Commerce Website project! This repository contains the frontend and backend code for a complete e-commerce application. The application includes user authentication, product listings, cart functionality, order management, and more.

Table of Contents
Overview
Features
Technologies Used
Installation
Usage
API Endpoints
Contributing
License
Contact
Overview
This e-commerce application provides a platform for users to browse products, add them to the cart, and place orders. The application includes user authentication for secure access and an admin interface to manage products and orders.

 <!-- Add a screenshot of your application here -->

Features
User authentication (Login/Register)
![Screenshot 2024-07-25 005646](https://github.com/user-attachments/assets/058f9a87-0919-47d2-9fe0-390fe485a9ba)
![Screenshot 2024-07-25 005813](https://github.com/user-attachments/assets/68154594-7ae4-42d7-89e3-1149c347c415)

Product listing with search functionality
![Screenshot 2024-07-25 010443](https://github.com/user-attachments/assets/a187bb6e-95aa-4671-b0ef-f211790c4542)



Shopping cart
![Screenshot 2024-07-25 010500](https://github.com/user-attachments/assets/d036413b-4d42-43d5-8f00-7c0fbeb14db0)

Order management
![Screenshot 2024-07-16 235521](https://github.com/user-attachments/assets/7b5e6cf2-a2bf-44e3-be49-a051378ce236)

User profile with editable information
![Screenshot 2024-07-17 001417](https://github.com/user-attachments/assets/cfc5e366-08d3-41d4-80a6-d9d126ff0d3d)
![Screenshot 2024-07-17 001247](https://github.com/user-attachments/assets/e137f636-5c47-4ef9-b03a-b568e6a7d6d5)





Technologies Used

Frontend
React.js
Axios for API requests
CSS for styling
Backend
Node.js
Express.js
MongoDB for the database![Screenshot 2024-07-25 005646](https://github.com/user-attachments/assets/1b5ad953-c8fe-4475-b7be-f84706c8dbbb)

JWT for authentication
Multer for handling file uploads
Installation
Follow these steps to get the project running locally:

Backend Setup
Clone the repository:

sh
Copy code
git clone https://github.com/yourusername/ecommerce-website.git
cd ecommerce-website
Navigate to the backend directory:

sh
Copy code
cd backend
Install dependencies:

sh
Copy code
npm install
Create a .env file in the backend directory and add your environment variables:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:

sh
Copy code
npm start
Frontend Setup
Navigate to the frontend directory:

sh
Copy code
cd ../frontend
Install dependencies:

sh
Copy code
npm install
Create a .env file in the frontend directory and add your environment variables:

env
Copy code
REACT_APP_API_URL=http://localhost:5000/api
Start the frontend server:

sh
Copy code
npm start
Usage
Register a new user: Navigate to the Register page and create a new account.
Login: Use the registered credentials to log in.
Browse Products: View the list of available products.
Search Products: Use the search bar to find specific products.
Add to Cart: Add products to your shopping cart.
Checkout: Place an order for the products in your cart.
Profile: Update your personal information and profile picture.
Admin: Manage products and orders (admin access required).
API Endpoints
Here are some key API endpoints:

Authentication
POST /api/register - Register a new user
POST /api/login - Login a user
Products
GET /api/products - Get all products
GET /api/products/:id - Get a single product by ID
POST /api/products - Create a new product (admin)
PUT /api/products/:id - Update a product (admin)
DELETE /api/products/:id - Delete a product (admin)
Orders
GET /api/orders - Get all orders (admin)
POST /api/orders - Create a new order
Profile
GET /api/profile - Get user profile
PUT /api/profile - Update user profile
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch: git checkout -b feature/your-feature-name.
Make your changes and commit them: git commit -m 'Add some feature'.
Push to the branch: git push origin feature/your-feature-name.
Create a pull request.
Please ensure your code adheres to the project's coding conventions and includes appropriate tests.
