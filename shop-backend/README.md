# Shop Backend API

This directory contains the **backend REST API** for the Shop application, built with Node.js, Hapi ts, and MongoDB.

---

## Prerequisites

* Node.js 18 or higher
* npm package manager
* MongoDB instance running or accessible

---

## Setup Instructions

1. **Install dependencies**

```bash
npm install
```

2. **Create a `.env` file** in the `backend` directory with the following variables:

```dotenv
PORT=3000
MONGO_URI=mongodb://localhost:27017
DB_NAME=shop
```

3. **Build the application**

```bash
npm run build
```

4. **Run the API**

* For development with auto-reload:

```bash
npm run dev
```

* For production:

```bash
npm start
```

---

## Accessing the API

Once running, the backend will be accessible at:

```
http://localhost:<PORT>
```

Example health check endpoint:

```
GET http://localhost:3000/api/1.0.0/health
```

---

## Notes

* Ensure MongoDB is running and accessible via the `MONGO_URI` you provide.
* Do not commit `.env` to version control as it contains sensitive credentials.
* You can customize the `PORT` variable if 3000 conflicts with another service.
