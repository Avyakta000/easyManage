# Easy Manage

## Overview

This project is a management application designed to handle user management. It features a backend built with Node.js/Express and a frontend developed using Vue.js. The platform allows administrators to invite users, update profiles, and manage resources efficiently while users still accessing the application and perform invites, changing their details and updating their passwords.

---
Note:Reachout (html78910@gmail.com to use admin view)

---
![Screenshot 2024-11-24 122754](https://github.com/user-attachments/assets/438590f3-6323-4fe6-abdb-8c98bdabdbac)

## Table of Contents

1. [Functionality](#functionality)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [Technologies Used](#technologies-used)

---

## Functionality

### Backend

- **User Management**: 
  - Ability to read, update, delete user profiles and send invites.
  - User roles (e.g., Admin, User) with specific permissions.
  - Invite users via email and send an invitation link.
  - Token-based authentication for secure access to the admin panel.
  
- **Admin Panel**:
  - Admin users can manage users.
  - Admin users can assign different roles.
  ![Screenshot 2024-11-24 123206](https://github.com/user-attachments/assets/ace8e0d8-f89f-4e4f-b792-a08147e2e015)

- **API Endpoints (basic)**:
  - `/api/users` - Fetch, update, and delete users.
  - `/api/auth/invite` - Send Invites.
  - `/api/auth/login` - User authentication.
  - `/api/auth/signup` - User registration.

---

### Frontend

- **User Interface**: Role Based (user and admin)
  - Admins: A responsive dashboard to manage users, view profiles.
  - Displaying user data dynamically with the ability to update user information.
  
- **Features**:
  - User authentication (login/logout/signup).
  - View and manage user profiles update / delete.
  - Send invites to the application.
  - Change Password and update user's information.
  - Invite new users via a modal with an email field.

---

## Frontend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Avyakta000/easyManage.git
   cd frontend
  
2. **Install the dependencies & run the project**:
   ```bash
   cd frontend
   npm install
   npm run dev
  
  

## Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Avyakta000/easyManage.git
   cd backend

2. **Install the dependencies**:
   ```bash
   cd backend
   npm install
   
3. **Setup Prisma ORM**:
   ```bash
   npx prisma init

4. **Setup env Configuration**:
   create .env file in your project's root and define the following variables
   Note: Database URL is manadatory for the next step

   PORT:'5000'
   JWT_SECRET='xyz-secret'
   DATABASE_URL='postgresql://<username>:<password>@<host>:<port>/<database>?schema=public'
   EMAIL_HOST_USER="xyz@easymanage.com"
   EMAIL_HOST_PASSWORD="your provider's app password"
   CLIENT_URL='http://localhost:5173'

5. **Setup Prisma ORM**:
   ```bash
   npx prisma db pull 

6. **Finally, Run the Backend**:
   ```bash
   npm run dev
   
7. **Use this if you have made any changes in (Models) prisma.schema**:
   ```bash
   npx prisma generate

## Technologies Used
   **Node.js Express PostgreSql Prisma Vue.js**




