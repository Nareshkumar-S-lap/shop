# Shop Application

A full-stack shop application with **backend (Node.js + Hapi + Typescript + MongoDB)** and **frontend (React[Next.js]) and Redux**. This project demonstrates a clean Dockerized setup with automated CI workflows for code quality and builds.

---

## Project Structure

```
shop/
├── backend/           # Node.js backend code
├── frontend/          # React[Next.js] frontend code
├── docker-compose.yml
├── .env               # Environment variables (not committed to Git)
├── .github/workflows/ # GitHub Actions CI workflows
└── README.md
```

---

## Features

* Backend: REST API for shop operations, connects to MongoDB.
* Frontend: React[Next.js] standalone application, communicates with backend API.
* Fully Dockerized setup for consistent development and deployment.
* CI workflow with **GitHub Actions** for formatting, linting, and building changes.
* Environment variables are used for secrets and configuration.
* Ports and host binding configured for accessibility from host machine.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Nareshkumar-S-lap/shop.git
cd shop
```

### 2. Create a `.env` file

```dotenv
# Backend
MONGO_URI=mongodb://localhost:27017
DB_NAME=shopdb
PORT=3000

# Frontend
UI_PORT=4000
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/1.0.0
```

> ⚠️ Do **not** commit `.env` to the repository — it contains sensitive information.

### 3. Build and run containers

**Option A: Using Docker Compose manually**

```bash
docker-compose build
docker-compose up -d
```

### 4. Verify containers

```bash
docker-compose ps
docker-compose logs -f backend
docker-compose logs -f ui
```

### 5. Access the application

* Backend API: [http://localhost:3000](http://localhost:3000)
* Frontend UI: [http://localhost:4000](http://localhost:4000)

---

## CI Workflow (GitHub Actions)

The project includes a GitHub Actions workflow for pull requests on the `main` branch. It automatically:

1. Detects changes in backend or frontend folders.
2. Runs formatting, linting, and build steps only for changed directories.

---

## Decisions Made

* React[Next.js] standalone build used for frontend Docker image.
* Backend and frontend separated into subdirectories for clarity.
* Environment variables managed securely via `.env` and Docker args.
* GitHub Actions CI workflow added to enforce code quality and ensure builds pass.
* Ports and host configured to allow access from host machine.

---

## Repository Link

[https://github.com/Nareshkumar-S-lap/shop.git]
