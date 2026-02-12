# Non-Teaching Staff System Design

## 🗄️ MongoDB Schemas (Role-Based)

### 1️⃣ User Schema (Common for ALL roles)
**Collection:** `users`
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  role: String, // ADMIN | STUDENT | TEACHER | PARENT | DRIVER | ACCOUNTANT | PEON | CLEANING | LIBRARIAN | RECEPTIONIST | SECURITY
  staffType: String, 
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 2️⃣ Attendance Schema (All Staff)
**Collection:** `attendances`
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  date: Date,
  checkIn: Date,
  checkOut: Date,
  status: String // Present | Absent
}
```

### 🚍 Driver-Specific Schemas

**3️⃣ Vehicle Schema**
```javascript
{
  _id: ObjectId,
  vehicleNumber: String,
  routeName: String,
  pickupPoints: [String],
  dropPoints: [String]
}
```

**4️⃣ Trip Schema**
```javascript
{
  _id: ObjectId,
  driverId: ObjectId,
  vehicleId: ObjectId,
  date: Date,
  status: String, // Not Started | In Progress | Completed
  startTime: Date,
  endTime: Date
}
```

### 🧾 Accountant Schemas

**5️⃣ Fee Schema**
```javascript
{
  _id: ObjectId,
  studentId: ObjectId,
  amount: Number,
  paymentMode: String,
  status: String, // Paid | Pending
  date: Date
}
```

### 🧹 Cleaning / Peon Schemas

**6️⃣ Task Schema**
```javascript
{
  _id: ObjectId,
  staffId: ObjectId,
  taskTitle: String,
  description: String,
  status: String, // Pending | In Progress | Completed
  assignedBy: ObjectId,
  date: Date
}
```

### 📚 Librarian Schemas

**7️⃣ Book Schema**
```javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  category: String,
  available: Boolean
}
```

**8️⃣ BookTransaction Schema**
```javascript
{
  _id: ObjectId,
  bookId: ObjectId,
  studentId: ObjectId,
  issueDate: Date,
  returnDate: Date,
  fineAmount: Number
}
```

### 🧑‍💼 Receptionist Schemas

**9️⃣ Visitor Schema**
```javascript
{
  _id: ObjectId,
  name: String,
  purpose: String,
  inTime: Date,
  outTime: Date,
  contact: String
}
```

### 🛡️ Security Schemas

**🔟 Incident Schema**
```javascript
{
  _id: ObjectId,
  securityId: ObjectId,
  description: String,
  time: Date,
  reportedTo: ObjectId
}
```

### 🧾 Audit Log Schema (System-Wide)
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  action: String,
  module: String,
  timestamp: Date
}
```

---

## 🔌 API LIST PER ROLE

### 🔐 Common Auth APIs (All Roles)
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

### 🚍 Driver APIs
- `GET /api/trips/my`
- `POST /api/trips/start`
- `PATCH /api/trips/:id/end`
- `GET /api/vehicles/my`

### 🧾 Accountant APIs
- `GET /api/fees`
- `POST /api/fees/collect`
- `GET /api/fees/reports`

### 🧹 Cleaning / Peon APIs
- `GET /api/tasks/my`
- `PATCH /api/tasks/:id/status`

### 📚 Librarian APIs
- `GET /api/books`
- `POST /api/books`
- `POST /api/books/issue`
- `POST /api/books/return`
- `GET /api/books/overdue`

### 🧑‍💼 Receptionist APIs
- `POST /api/visitors`
- `GET /api/visitors/today`
- `PATCH /api/visitors/:id/checkout`

### 🛡️ Security APIs
- `GET /api/visitors`
- `POST /api/incidents`
- `GET /api/incidents`

### 🧠 Admin APIs (Controls All)
- `GET /api/users`
- `POST /api/users`
- `PATCH /api/users/:id/role`
- `GET /api/audit`
- `GET /api/analytics`