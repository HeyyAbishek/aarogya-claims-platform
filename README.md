# AarogyaID Claims Management Platform

A full-stack web application designed to streamline the insurance claims process through secure patient submissions, document management, and insurer-side claim review and decision-making.

## 📋 Overview

The **AarogyaID Claims Management Platform** serves two distinct user roles:

### 👤 Patients

Patients can:

- Securely submit insurance claims
- Upload supporting documents such as receipts or prescriptions
- Track the status of submitted claims
- View approved claim amounts and submission details

### 🏢 Insurers

Insurers can:

- Access a centralized claims dashboard
- Review submitted claims
- Filter claims using multiple criteria
- Approve or reject claims
- Set approved claim amounts
- Add administrative comments
- View supporting claim documents

This project was built for the **AarogyaID Technical Assessment**, with a focus on clean architecture, role-based routing, secure authentication, document storage, and a reliable REST API.

---

## 🚀 Live Deployment & Demo

- **Live Application:** https://aarogya-claims-platform-ten.vercel.app/


---

## 🔐 Mock Credentials

Registration is intentionally bypassed for this assessment.

Use the following seeded credentials to test the platform:

### Patient Portal

```text
Email: patient@demo.com
Password: password123
```

### Insurer Portal

```text
Email: insurer@demo.com
Password: password123
```

---

## ✨ Features Implemented

### 👤 Patient Portal

#### [P-1] Submit a Claim

A dedicated claim submission form captures:

- Patient name
- Email
- Claim amount
- Claim description
- Supporting document

Supporting documents such as receipts and prescriptions are uploaded securely to **Cloudinary**.

#### [P-2] View Claims

Patients have access to a personalized dashboard showing:

- All submitted claims
- Claim status
- Submission date
- Approved amount

Supported claim statuses:

- `Pending`
- `Approved`
- `Rejected`

---

### 🏢 Insurer Portal

#### [I-1] Claims Dashboard

Insurers can access a centralized dashboard containing all system claims.

The dashboard supports backend-driven filtering by:

- Status
- Submission date
- Minimum claim amount
- Maximum claim amount

#### [I-2] Manage Claims

Insurers can review individual claims and:

- Inspect claim details
- View uploaded supporting documents
- Approve or reject claims
- Set approved amounts
- Add internal administrative comments

---

### 🔗 Shared Features

#### [S-1] Authentication

- JWT-based authentication
- Role-based login
- Patients are routed exclusively to the Patient Portal
- Insurers are routed exclusively to the Insurer Portal
- Protected API routes based on user role

#### [S-2] REST API

The application follows a RESTful architecture for authentication, claim submission, claim retrieval, filtering, and claim management.

#### [S-3] Database

MongoDB is used for persistent data storage with **Mongoose schemas** matching the requested claims data model.

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │     React Frontend  │
                    │                     │
                    │ Patient / Insurer   │
                    │      Portals        │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │   Node.js + Express │
                    │                     │
                    │ JWT Authentication  │
                    │ Role-Based Access   │
                    │ Claims API          │
                    └───────┬───────┬─────┘
                            │       │
                ┌───────────┘       └────────────┐
                ▼                                ▼
       ┌─────────────────┐              ┌─────────────────┐
       │ MongoDB Atlas   │              │   Cloudinary    │
       │                 │              │                 │
       │ Users           │              │ Claim Documents │
       │ Claims          │              │ Receipts        │
       │ Comments        │              │ Prescriptions   │
       └─────────────────┘              └─────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Tailwind CSS

### Backend

- Node.js
- Express.js
- JSON Web Tokens (JWT)

### Database

- MongoDB Atlas
- Mongoose

### Document Storage

- Cloudinary

---

## 📁 Project Structure

```text
AarogyaID-Claims-Platform/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   └── ...
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites

Make sure the following are installed or available:

- **Node.js** v18 or later
- **MongoDB** local instance or MongoDB Atlas
- **Cloudinary Account** for document uploads

---

### 1. Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_jwt_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> **Note:** Do not commit your `.env` file or expose your Cloudinary credentials and JWT secret in the repository.

---

### 2. Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend server:

```bash
npm start
```

The API will run on:

```text
http://localhost:5000
```

---

### 3. Run the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at the local URL displayed by Vite.

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| `POST` | `/patients/login` | Authenticate patient |
| `POST` | `/insurers/login` | Authenticate insurer |

---

### Patient Routes

> Requires a valid **Patient JWT**.

| Method | Endpoint                | Description                                        |
| ------ | ----------------------- | -------------------------------------------------- |
| `POST` | `/patients/claim`       | Submit a new claim                                 |
| `GET`  | `/patients/claimStatus` | Retrieve claims belonging to the logged-in patient |

The claim submission endpoint accepts:

```text
multipart/form-data
```

to support document uploads.

---

### Insurer Routes

> Requires a valid **Insurer JWT**.

| Method | Endpoint               | Description                                        |
| ------ | ---------------------- | -------------------------------------------------- |
| `GET`  | `/insurers/claims`     | Fetch all claims with optional filters             |
| `GET`  | `/insurers/claims/:id` | View individual claim details                      |
| `PUT`  | `/insurers/claims/:id` | Update claim status, approved amount, and comments |

### Insurer Filtering

The claims endpoint supports query parameters such as:

```text
GET /insurers/claims?status=Pending
```

```text
GET /insurers/claims?minAmount=1000&maxAmount=50000
```

```text
GET /insurers/claims?status=Approved&minAmount=5000
```

Supported filters:

- `status`
- `date`
- `minAmount`
- `maxAmount`

---

## 🔐 Authentication Flow

The application uses stateless JWT authentication.

```text
Patient / Insurer
       │
       ▼
    Login
       │
       ▼
 Express API
       │
       ├── Validate Credentials
       │
       └── Generate JWT
               │
               ▼
          Frontend
               │
               ▼
           localStorage
               │
               ▼
      Authenticated Requests
               │
               ▼
       JWT Middleware
               │
               ▼
      Role-Based Access
        ┌──────┴──────┐
        ▼             ▼
    Patient        Insurer
     Routes         Routes
```

Protected API requests include the JWT using the `Authorization` header:

```http
Authorization: Bearer <token>
```

---

## 📄 Document Upload Flow

Supporting documents are stored using Cloudinary rather than the server's local filesystem.

```text
Patient
   │
   ▼
Claim Submission Form
   │
   ▼
Express API
   │
   ▼
Cloudinary Upload
   │
   ▼
Document URL
   │
   ▼
MongoDB
   │
   └── Claim + Document Reference
```

This approach ensures uploaded documents persist across server restarts and deployments.

---

## 🧠 Assumptions & Architectural Decisions

### 1. Stateless Authentication

Redis caching was intentionally removed to keep the architecture simple and suitable for serverless or cloud deployments such as Render/Vercel.

Authentication is handled using stateless JWTs.

Logout is handled on the frontend by removing the JWT from `localStorage`.

### 2. Cloud Document Storage

Standard cloud deployment platforms may use ephemeral server filesystems.

Therefore, local Multer-based persistent storage was avoided in favor of **Cloudinary** for claim documents.

This ensures uploaded documents remain available across server restarts and deployments.

### 3. Seeded Authentication

As specified in the assessment, registration flows were intentionally omitted.

Instead, the application uses seeded patient and insurer accounts to allow reviewers to immediately test the core claims management functionality.

### 4. Role-Based Routing

The frontend uses the authenticated user's role to determine which portal they can access.

```text
JWT
 │
 ▼
User Role
 │
 ├── patient → Patient Portal
 │
 └── insurer → Insurer Portal
```

Backend routes are also protected according to the user's role, ensuring that frontend routing alone is not relied upon for access control.

---

## 🧪 Testing the Application

### Patient Flow

1. Login using the seeded patient credentials.
2. Open the claim submission form.
3. Enter claim information.
4. Upload a receipt or prescription.
5. Submit the claim.
6. Open the patient dashboard.
7. Verify the claim status and approved amount.

### Insurer Flow

1. Login using the seeded insurer credentials.
2. Open the claims dashboard.
3. Filter claims by status, date, or amount.
4. Open an individual claim.
5. Review claim details and uploaded documentation.
6. Approve or reject the claim.
7. Set the approved amount.
8. Add an administrative comment.
9. Verify that the claim status is updated.

---

## 📌 Assessment Scope

The implementation prioritizes:

- Secure role-based access
- Patient claim submission
- Supporting document uploads
- Claim status tracking
- Insurer claim review
- Backend-driven filtering
- Claim approval/rejection
- RESTful API design
- MongoDB persistence
- Stateless authentication
- Cloud-based document storage

---

## 📄 License

Created for the **AarogyaID Technical Assessment** and educational/portfolio purposes.
