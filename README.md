# User Access Management System

## Introduction

### Purpose
The User Access Management System allows:
- User registration
- Login & JWT-based authentication
- Software access requests
- Managerial approvals

### Scope
Core features include:
- User Registration & Login
- Role-based Access (Employee/Manager/Admin)
- Software Management (Admin only)
- Access Request Submission (Employee)
- Request Approval or Rejection (Manager)

### Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: React
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT
- **Tooling**: bcrypt, dotenv, nodemon

---

## Features
- **User Registration & Login**: Secure authentication using JWT
- **Role-based Access**: Employee, Manager, Admin
- **Software Access Requests**: Employees can request access to software
- **Request Approval Workflow**: Managers can approve/reject requests
- **PostgreSQL with TypeORM**: Manages database schema and relations

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/user-access-system.git
cd user-access-system
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create PostgreSQL database
createdb user_access

# Create environment file
echo "DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=user_access
JWT_SECRET=secretkey
PORT=5000" > .env

# Start backend
npm run dev
```

### 3. Frontend Setup (in a new terminal)
```bash
cd ../frontend
npm install
npm start
```

---

## API Documentation

### Authentication
#### Signup
`POST /api/auth/signup`
```json
{
  "username": "employee@company.com",
  "password": "Password123!"
}
```

#### Login
`POST /api/auth/login`
Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "Employee",
  "userId": 1
}
```

---

### Software Management (Admin Only)
#### Create Software
`POST /api/software`
```json
{
  "name": "VPN Access",
  "description": "Corporate VPN software",
  "accessLevels": ["Read", "Write"]
}
```

---

### Access Requests
#### Submit Request (Employee)
`POST /api/requests`
```json
{
  "softwareId": 1,
  "accessType": "Read",
  "reason": "Need access for project work"
}
```

#### Approve/Reject (Manager)
`PATCH /api/requests/:id`
```json
{
  "status": "Approved"
}
```

---

## Database Schema

### User Entity
```typescript
@Entity()
class User {
  @PrimaryGeneratedColumn() id: number;
  @Column({ unique: true }) username: string;
  @Column() password: string;
  @Column() role: 'Employee' | 'Manager' | 'Admin';
}
```

### Software Entity
```typescript
@Entity()
class Software {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column('text') description: string;
  @Column("simple-array") accessLevels: string[];
}
```

### Request Entity
```typescript
@Entity()
class Request {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(() => User) user: User;
  @ManyToOne(() => Software) software: Software;
  @Column() accessType: 'Read' | 'Write' | 'Admin';
  @Column('text') reason: string;
  @Column() status: 'Pending' | 'Approved' | 'Rejected';
}
```
