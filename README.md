 22UP1A05F9 – URL Shortener with Logging Middleware

This repository contains the implementation of a URL Shortener Application with integrated custom Logging Middleware.  
The project is structured into two main modules as required:

- /logging-middleware – Reusable logging package that communicates with the evaluation test server.  
- /url-shortener-frontend – React application implementing the URL shortener functionality, analytics, and UI.

---

## Features

### URL Shortener (Frontend)
- Shorten up to 5 URLs at once.
- Optional custom shortcode (validated and uniqueness enforced).
- Optional validity period in minutes (default: 30 mins).
- Generates shortened links in the format:
```
```
- Handles redirection client-side through React Router.
- Tracks analytics:
- Click count per short URL.
- Detailed click logs: timestamp, source (referrer), location (coarse).
- Displays:
- Original URL, Short URL.
- Created At / Expiry Time (with clear formatting).
- Expired state (with badge).
- Full Material UI (MUI) styling for a clean, responsive experience.

### Logging Middleware
- Implements a reusable `Log(stack, level, package, message)` function.
- Sends structured logs to:
```

[http://20.244.56.144/evaluation-service/logs](http://20.244.56.144/evaluation-service/logs)

```
- Logs debug, info, warn, error, fatal messages.
- Integrated across both frontend and backend to track:
- Page loads
- Shortening requests
- Collisions / errors
- Redirect failures
- No console.log used.

---

## Tech Stack
- Frontend: React + TypeScript + React Router + Material UI  
- Backend (Optional): Node.js + Express (for persistence APIs only)  
- Storage: LocalStorage (for session/state persistence)  
- Logger: Custom reusable module, integrated with the evaluation server  


## Setup Instructions
### Clone the Repo
```bash
git clone https://github.com/Pravallikaseshab01/22UP1A05F9.git
cd 22UP1A05F9
````

### 1. Install Frontend

```bash
cd url-shortener-frontend
npm install
```

Run development server:

```bash
npm start
```

Frontend runs on:

```
http://localhost:3000
```

### 2. Run Backend (Optional)

Backend is only for persistence (/shorten, /history, /delete).

```bash
cd redirector
npm install
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

## Authentication for Logger

1. Register with the evaluation service using your roll number and email.
   Endpoint:

   ```
   POST http://20.244.56.144/evaluation-service/register
   ```

   Save your `clientID` and `clientSecret`.

2. Get an auth token:

   ```
   POST http://20.244.56.144/evaluation-service/auth
   ```

   Response contains:

   ```json
   {
     "token_type": "Bearer",
     "access_token": "<your-token>"
   }
   ```

3. Initialize logger:

   ```ts
   import { initLogger, Log } from "../logger"

   initLogger({ token: "<your-token>" })
   Log("frontend", "info", "page", "Generate page loaded")
   ```

---

## Testing

### Postman / API

* Shorten URL

  ```
  POST http://localhost:5000/shorten
  Body: { "originalUrl": "https://example.com", "customAlias": "test123", "validUntil": "..." }
  ```
* History

  ```
  GET http://localhost:5000/history
  ```
* Delete

  ```
  DELETE http://localhost:5000/history/:id
  ```

### React

* Open `http://localhost:3000`
* Create short URLs, copy short links, check redirection and statistics page.

---

## Screenshots

* Generate Page (Desktop & Mobile)
* Statistics Page (Desktop & Mobile)
* Postman API test results

Attach screenshots in submission.

---

## Constraints Covered

* Logging Middleware integrated (no console.log).
* Client-side routing and redirect logic in React.
* Unique shortcodes with validation.
* Default validity of 30 minutes.
* Material UI used throughout.
* Error handling with Snackbar alerts.
* GitHub repo structured correctly.

---

## Author

* Roll No: 22UP1A05F9
* GitHub: [Pravallikaseshab01](https://github.com/Pravallikaseshab01)

<img width="1255" height="800" alt="image" src="https://github.com/user-attachments/assets/2782efbf-f4dd-44b8-9b76-a8ad507c679a" />
<img width="1117" height="663" alt="image" src="https://github.com/user-attachments/assets/be90193d-f64a-4392-8708-7463fea06634" />


