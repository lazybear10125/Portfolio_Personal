# 🌟 Premium Animated Full-Stack Developer Portfolio

An enterprise-grade, high-performance personal portfolio website engineered with **Java 21**, **Spring Boot 3**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed with a modern futuristic dark theme, glassmorphism aesthetics, fluid 60 FPS micro-interactions, 3D card tilt behaviors, and a robust RESTful API backed by MySQL and Spring Security.

---

## 🚀 Key Highlights & Architectural Features

### 🎨 Visual & Motion Design
- **Theme Palette**: Deep Cyber Blue-Black background (`#080B14`), Neon Violet accents (`#8B5CF6`), and Vibrant Cyan highlights (`#22D3EE`).
- **Loading Reveal Experience**: Atmospheric preloader displaying logo animation, status feedback, and a dynamic progress bar before smoothly revealing the site.
- **Dynamic Starfield Canvas**: Hardware-accelerated particle system reacting seamlessly to cursor coordinates with constellation linkages.
- **Magnetic Buttons & Cursor Glow**: Custom cursor halo trailing user inputs on desktop and magnetic repulsion on primary call-to-action buttons.
- **3D Tilt & Specular Highlights**: Project cards dynamically calculate cursor delta to tilt along X/Y axes with radiant spotlight reflections.
- **Interactive Project Architecture Modals**: In-depth architecture breakdown across Frontend, Backend, Database, and DevOps layers.
- **Accessibility & Reduced Motion**: Full compliance with semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) and `prefers-reduced-motion` support.

### 🛡️ Enterprise Backend (Java 21 + Spring Boot 3)
- **Layered Architecture**: Strict separation of concerns — `Controller`, `Service`, `Repository`, `Entity`, `DTO`. Entities are never leaked directly to clients.
- **Spring Security Protection**:
  - `POST /api/contacts`: Publicly accessible for visitors to submit inquiries.
  - `GET /api/contacts`: Secured administrator endpoint requiring `ROLE_ADMIN` authentication via HTTP Basic Auth.
- **Stateless RESTful Design**: Integrated CORS policy supporting dynamic Vite development and production ports.
- **Validation & Exception Handling**: Centralized `GlobalExceptionHandler` intercepting `@Valid` constraints and producing RFC-compliant JSON responses.
- **Multi-Environment Database Support**:
  - Production / Docker: MySQL 8.0 with InnoDB, index tuning, and UTF8MB4 charset.
  - Dev / Fallback: H2 in-memory mode for zero-configuration local runs.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Canvas Confetti |
| **Backend** | Java 21 LTS, Spring Boot 3.3, Spring Web, Spring Security, Spring Data JPA, Hibernate |
| **Database** | MySQL 8.0 (with connection pooling via HikariCP), H2 (in-memory dev profile) |
| **Container & CI/CD** | Docker, Docker Compose, Multi-stage builds, Nginx reverse proxy |

---

## 📁 Project Directory Structure

```text
Portfolio_Personal/
├── frontend/                     # React + TypeScript + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── 3d/               # Lightweight Interactive Canvas
│   │   │   ├── common/           # MagneticButton, CustomCursor, ScrollProgress, etc.
│   │   │   ├── layout/           # Sticky Navbar, Glassmorphism Footer
│   │   │   ├── loading/          # Atmospheric LoadingScreen
│   │   │   ├── modals/           # ProjectDetailModal
│   │   │   └── sections/         # Hero, About, Skills, Projects, Experience, Contact
│   │   ├── data/                 # Skills, Projects, and Experience datasets
│   │   ├── services/             # ContactService (REST API client)
│   │   ├── types/                # Strict TypeScript contracts & interfaces
│   │   ├── App.tsx               # Root view container
│   │   ├── main.tsx              # Application mount entrypoint
│   │   └── index.css             # Tailwind base & glassmorphism utilities
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── backend/                      # Java 21 Spring Boot 3 REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/portfolio/backend/
│   │   │   │   ├── config/       # SecurityConfig, CorsConfig
│   │   │   │   ├── controller/   # ContactController
│   │   │   │   ├── dto/          # ContactRequestDto, ContactResponseDto, ApiResponse
│   │   │   │   ├── entity/       # Contact JPA Entity
│   │   │   │   ├── exception/    # GlobalExceptionHandler, ResourceNotFoundException
│   │   │   │   ├── repository/   # ContactRepository
│   │   │   │   └── service/      # ContactService & ContactServiceImpl
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── schema.sql    # Idempotent DB table creation
│   │   └── test/                 # Full Integration Tests (MockMvc + Security)
│   ├── pom.xml
│   └── mvnw.cmd                  # Maven portable wrapper
├── docker/
│   ├── Dockerfile.backend        # Multi-stage Java 21 JRE container
│   ├── Dockerfile.frontend       # Node Vite build + Nginx Alpine
│   └── nginx.conf                # Nginx reverse proxy configuration
├── docker-compose.yml            # Complete one-click stack (MySQL + Backend + Frontend)
├── .env.example                  # Environment configuration template
└── README.md
```

---

## ⚡ Quick Start Guide

### Option 1: Run with Docker Compose (Recommended)

To spin up MySQL 8.0, the Spring Boot REST API, and the React Frontend simultaneously:

```bash
# 1. Clone repository and navigate to root
cd Portfolio_Personal

# 2. Copy environment template
cp .env.example .env

# 3. Launch all containers
docker compose up --build -d
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend REST API**: [http://localhost:8080](http://localhost:8080)
- **MySQL Database**: `localhost:3306` (Database: `portfolio_db`)

---

### Option 2: Run Locally on Host Machine

#### Step 1: Run Backend Spring Boot (Java 21)

```bash
cd backend

# Option A: Run with in-memory H2 (Zero MySQL setup needed)
# On PowerShell: Wrap the -D argument in quotes
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=dev"

# On Command Prompt (cmd):
mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev

# Option B: Run with local MySQL (Ensure MySQL is listening on 3306)
# On PowerShell: Wrap the -D argument in quotes
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=mysql"

# On Command Prompt (cmd):
mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=mysql
```
The backend starts at `http://localhost:8080`.

#### Step 2: Run Frontend React (Node.js)

```bash
cd frontend

# Install dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev
```
The frontend starts at `http://localhost:5173`.

---

## 📡 REST API Reference

### 1. Submit Contact Message (Public)
- **Endpoint**: `POST /api/contacts`
- **Access**: Public
- **Request Body**:
```json
{
  "fullName": "Sarah Connor",
  "email": "sarah.connor@cyberdyne.com",
  "subject": "Cloud Infrastructure Architect Role",
  "message": "We would like to discuss a senior engineering opportunity with our core distributed platform team."
}
```
- **Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Your inquiry has been successfully received. We will get back to you shortly!",
  "data": {
    "id": 1,
    "fullName": "Sarah Connor",
    "email": "sarah.connor@cyberdyne.com",
    "subject": "Cloud Infrastructure Architect Role",
    "message": "We would like to discuss a senior engineering opportunity with our core distributed platform team.",
    "createdAt": "2026-11-02T11:30:00"
  },
  "timestamp": "2026-11-02T11:30:00.123"
}
```

### 2. View All Inquiries (Administrator)
- **Endpoint**: `GET /api/contacts`
- **Access**: Requires HTTP Basic Auth (`ROLE_ADMIN`)
- **Default Credentials**:
  - Username: `admin`
  - Password: `admin123`
- **cURL Command**:
```bash
curl -u admin:admin123 http://localhost:8080/api/contacts
```

---

## 🧪 Testing & Verification

Run the comprehensive integration test suite for the Spring Boot backend:

```bash
cd backend
.\mvnw.cmd test
```

All 5 test cases will execute:
1. `POST /api/contacts` — 201 Created validation
2. `POST /api/contacts` — 400 Bad Request input validation error handling
3. `GET /api/contacts` — 401 Unauthorized barrier test
4. `GET /api/contacts` — 200 OK authenticated administrator retrieval
5. Spring Application Context bootstrapping check

---

## 👨‍💻 Author & License
Crafted by **Alex Nguyen** (Senior Full-stack Developer & Motion UX Craftsman).  
Licensed under the **MIT License**.
