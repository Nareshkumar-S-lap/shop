# Shop Frontend (UI)

This directory contains the **frontend UI** for the Shop application, built with **React[Next.js]**.

---

## Prerequisites

* Node.js 18 or higher
* npm, yarn, or pnpm package manager

---

## Setup Instructions

1. **Install dependencies**

```bash
npm install
```

2. **Create a `.env` file** in the `frontend` directory with the following variable:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/1.0.0
```

> ⚠️ Do not commit `.env` to version control as it contains environment-specific configuration.

3. **Run the development server**

```bash
npm run dev
```

4. **Access the frontend**

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

> The frontend automatically picks up the API base URL from `NEXT_PUBLIC_API_BASE_URL`.

---

## Build and Production

1. **Build the production version**

```bash
npm run build
```

2. **Start the production server**

```bash
npm start
```

The production frontend will use the same `NEXT_PUBLIC_API_BASE_URL` environment variable for API requests.

---

## Notes

* You can change the API base URL in `.env` if the backend runs on a different host or port.
* Next.js hot-reloads on changes to the source code.
* Ensure the backend API is running and accessible before starting the frontend.
