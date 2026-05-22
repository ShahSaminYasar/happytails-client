# 🐾 Happy Tails - Pet Adoption Platform

Happy Tails is a full-stack pet adoption platform where people can find their next furry (or feathery) companion. Whether you're looking to adopt a dog, cat, bird, or rabbit - you'll find them here. Shelters and pet owners can list pets, manage adoption requests, and connect with loving families.

## 🌐 Live Site

[https://ssy-happytails.vercel.app](https://ssy-happytails.vercel.app)

## ✨ Features

- 🔍 **Browse & Search Pets** - Explore all available pets with real-time search by name and filter by species
- 📋 **Adoption Requests** - Submit adoption requests with a pickup date and message directly from a pet's profile
- 🏠 **Owner Dashboard** - Add, edit, and delete your pet listings; approve or reject incoming adoption requests
- 🔐 **Secure Authentication** - Email/password and Google sign-in powered by Better Auth with JWT stored in HttpOnly cookies
- 📬 **Request Tracking** - Requesters can track their adoption status (Pending / Approved / Rejected) and cancel anytime
- 🌙 **Dark / Light Theme** - Toggle between dark and light mode with preference saved across sessions
- 🎞️ **Smooth Animations** - Page transitions and UI interactions powered by Framer Motion
- 📱 **Fully Responsive** - Works great on mobile, tablet, and desktop

## 🛠️ NPM Packages Used

### Client
- `next` - React framework with App Router
- `tailwindcss` - Utility-first CSS
- `shadcn/ui` - Accessible, composable UI components
- `@tanstack/react-query` - Server state management and data fetching
- `framer-motion` - Animations and page transitions
- `@phosphor-icons/react` - Icon library
- `axios` - HTTP client
- `better-auth` - Authentication
- `sonner` - Toast notifications

### Server
- `express` - Web framework
- `mongodb` - MongoDB native driver
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `jose-cjs` - JWT verification

---

Made with ❤️ for pets and the people who love them.