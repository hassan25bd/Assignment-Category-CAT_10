# PetNest - Pet Adoption Platform

## Purpose
PetNest is a full-stack MERN pet adoption platform where users can browse pets, view complete profiles, submit adoption requests, and track request status, while pet owners manage listings and approve or reject requests securely.

## Live URL
- Client (Vercel): https://your-client-url.vercel.app
- Server (Render): https://your-server-url.onrender.com

## Features
- Secure JWT authentication with HTTPOnly cookie storage and protected APIs.
- Public pet browsing with search by pet name and species filtering using MongoDB `$regex` and `$in`.
- Private pet details page with integrated adoption form and default `pending` request status.
- Dashboard for owners and adopters: My Requests, Add Pet, and My Listings.
- Owner request moderation workflow with approve/reject controls and one-approval enforcement.
- Automatic pet status control: approved request marks pet as adopted and blocks future adoptions.
- Responsive, recruiter-friendly UI with toast notifications, loading spinner, custom 404 page, and theme toggle.

## NPM Packages Used
### Client
- react
- react-dom
- react-router-dom
- axios
- react-hot-toast
- framer-motion
- react-icons

### Server
- express
- mongodb
- jsonwebtoken
- cookie-parser
- bcryptjs
- cors
- dotenv
- nodemon

## Environment Variables
### client/.env
VITE_API_URL=http://localhost:5000

### server/.env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development

## Local Setup
1. Clone the project.
2. Setup client:
   - `cd client`
   - `npm install`
   - `npm run dev`
3. Setup server:
   - `cd server`
   - `npm install`
   - Create `.env` from `.env.example`
   - `npm run dev`

## Deployment Notes
- Client is configured for route reload safety using `client/vercel.json` rewrite rules.
- Server CORS supports credentials and accepts configured client URL(s) from environment.
- Keep MongoDB credentials and JWT secrets in environment variables only.
- For production, set `NODE_ENV=production` and configure secure cookies.

## Commit Strategy For Full Marks
### Minimum 15 Client Commits (example)
1. Setup Vite app and routing base
2. Build Navbar and Footer layout
3. Add Home hero + static sections
4. Add Featured Pets section API integration
5. Build All Pets page with filters and sorting
6. Add Login page and form validation
7. Add Register page and password policy
8. Setup Auth Context and private route handling
9. Build Pet Details and adoption form UI
10. Connect adoption request API calls
11. Build Dashboard layout and navigation
12. Add My Requests page with cancel action
13. Add Add Pet form and submit flow
14. Add My Listings with edit/delete
15. Add request moderation modal and final UI polish

### Minimum 8 Server Commits (example)
1. Setup Express server and base middleware
2. Connect MongoDB and collection structure
3. Add auth register/login/logout routes
4. Implement JWT cookie and middleware verify
5. Add pets CRUD endpoints with owner checks
6. Add adoption request create/get/delete routes
7. Add owner approve/reject logic and adoption control
8. Add search/filter query operators, CORS/env hardening, and production cleanup
