# PetNest - Pet Adoption Platform

## Purpose
PetNest is a full-stack MERN platform that helps users discover adoptable pets, request adoptions, and manage request status while pet owners or shelters manage listings and approve or reject requests securely.

## Live URL
- Client: https://your-client-url.vercel.app
- Server: https://your-server-url.onrender.com

## Core Features
- JWT authentication with HTTPOnly cookies and protected private routes.
- Browse all pets with search, species filtering, and sorting support.
- Private pet details page with adoption request form and status handling.
- Dashboard modules: Add Pet, My Listings, and My Requests.
- Request moderation with approve/reject actions and single approval enforcement.
- Responsive UI for mobile, tablet, and desktop with toast-based notifications.
- Reload-safe client routing configured for deployment.

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

## Local Setup
1. Start client:
   - `npm install`
   - Create `.env` using `.env.example`
   - `npm run dev`
2. Start server:
   - `cd ../server`
   - `npm install`
   - Create `.env` using `.env.example`
   - `npm run dev`

## Deployment Notes
- Client is ready for Vercel with route rewrites in `vercel.json`.
- Server is ready for Render using `render.yaml`.
- Keep MongoDB URI and JWT secret in environment variables.

## Real Google Login Setup (Firebase)
1. Create a Firebase project and enable Google sign-in in Authentication.
2. Add client Firebase config keys to `client/.env` (`VITE_FIREBASE_*`).
3. Generate a Firebase service account key and copy values into `server/.env`:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` (keep `\n` newlines escaped)
4. Restart both client and server after env changes.

## Image Sources
- Hero and story visuals use real photography from Unsplash and Pexels.
- Links are credited in the site footer and image URLs are used only for assignment presentation.
