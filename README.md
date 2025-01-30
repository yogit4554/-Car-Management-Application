# 🏎️ Car Management Application

## Overview

The Car Management Application is a modern, full-stack web application designed to streamline the process of managing car listings.  It empowers users to effortlessly create, view, edit, and delete their car listings, each enriched with up to 10 images, a compelling title, a detailed description, and relevant tags (e.g., car type, company, dealer).  Built with a focus on user experience, the application incorporates robust user authentication, ensuring that users have complete control over their own listings.  A powerful global search functionality allows users to quickly find the cars they're interested in.

## ✨ Key Features

- **🔐 Secure User Authentication:**  Seamless signup and login powered by JWT (JSON Web Token) for enhanced security.
- **🚗 Effortless Car Management:**  Intuitive interface for adding, viewing, updating, and deleting car listings.
- **🖼️ High-Quality Image Uploads:**  Support for up to 10 images per car listing, seamlessly integrated with Cloudinary for optimal storage and delivery.
- **🔍 Powerful Search:**  Global search functionality enables users to find cars quickly and efficiently using keywords.
- **🚀 Modern Tech Stack:**  Built with cutting-edge technologies for a smooth and responsive user experience.
- **📚 Comprehensive API Documentation:**  Detailed API documentation using Postman, making it easy for developers to understand and integrate with the backend.

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS (for a modern and responsive UI)
- **Backend:** Node.js, Express.js (for a robust and scalable API)
- **Database:** MongoDB (for flexible and efficient data storage)
- **Authentication:** JWT (JSON Web Token) (for secure user authentication)
- **Image Storage:** Cloudinary (for optimized image management)
- **Deployment:** Render (for easy and reliable deployment)

## 🚀 Project Setup

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd server
2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` file** with the following variables:
    ```env
    PORT=5000
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-secret-key>
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
    REFRESH_TOKEN_EXPIRY=10d
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
    ```

4. **Start the backend server**:
    ```bash
    npm run start
    ```
### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd ../client
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Create a `.env` file** with the following  variables:
    ```env
    VITE_BACKEND_URL="http://localhost:8000"
    ```
4. **Start the development server**:
    ```bash
    npm run dev
    ```
# ⚙️ API Endpoints

## User Authentication

- **POST** `/api/v1/users/register`: Register a new user.
- **POST** `/api/v1/users/login`: User login.
- **POST** `/api/v1/users/logout`: User logout.
- **POST** `/api/v1/users/refresh-token`: Refresh access token.

## Car Management

- **POST** `/api/v1/cars/car-register`: Create a new car listing.
- **GET** `/api/v1/cars/get-user-car`: Get all cars owned by the logged-in user.
- **GET** `/api/v1/cars/:carId`: Get a specific car by ID.
- **PUT** `/api/v1/cars/update/:carId`: Update a car.
- **DELETE** `/api/v1/cars/:carId`: Delete a car.
- **POST** `/api/v1/cars/search`: Search for cars using keywords.

## 🚀 Deployment

- **Frontend**: [Car Management Frontend](https://car-management-application-1-05ty.onrender.com/)
- **Backend**: [Car Management Backend](https://car-management-application-g0we.onrender.com/)
- **Postman Collection**: [API Documentation](https://documenter.getpostman.com/view/36309775/2sAYX2LiZh)

## 💡 How to Use

1. Sign up or log in.
2. Create a new car listing with images, title, description, and tags.
3. View, update, or delete your cars.
4. Use the search bar to find cars based on title, description, or tags.

## 🤝 Let's Connect

Have ideas or feedback? I’d love to hear from you!
- **Email**: yteewari@gmail.com
- **Linkedin**: https://www.linkedin.com/in/yogendra-teewari/
- **GitHub**: https://github.com/yogit4554