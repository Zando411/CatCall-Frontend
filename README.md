# CatCall Frontend

This is the **React + Tailwind CSS** frontend for the **CatCall** platform, a Tinder-style cat adoption app that lets users like adoptable cats profiles, apply location-based filters, and get personalized recommendations, powered by multiple REST API microservices.

🌐**View Live:** [https://catcall.zando.dev](https://catcall.zando.dev)

## Notes

- This app is designed to run as part of the full [CatCall application](https://github.com/zandonella/CatCall).
- It communicates with five REST API microservices via environment-based API URLs.
- All service URLs are passed to the app at build time using `VITE_` prefixed environment variables.

## Built with:

- **React**
- **Tailwind CSS**
- **React Router**
- **Axios** for API communication

## Required Backend Services

To run the frontend successfully, the following services must be running on your machine:

| Service                                                                         | Example URL             |
| ------------------------------------------------------------------------------- | ----------------------- |
| [Auth Service](https://github.com/zandonella/auth-microservice)                 | `http://localhost:3001` |
| [Favorites Service](https://github.com/zandonella/favorites-microservice)       | `http://localhost:3002` |
| [Cat Database Service](https://github.com/zandonella/cat-database-microservice) | `http://localhost:3003` |
| [Preferences Service](https://github.com/zandonella/preferences-microservice)   | `http://localhost:3004` |
| [Recommender Service](https://github.com/zandonella/recommender-microservice)   | `http://localhost:3005` |

> Make sure each service is running on the correct port and accessible at the specified base path.

---

## Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Modify the values in `.env` as needed:

**Example `.env` contents:**

```env
VITE_AUTH_URL=http://localhost:3001
VITE_CAT_DB_URL=http://localhost:3002
VITE_PREFERENCES_DB_URL=http://localhost:3003
VITE_RECOMMENDER_SERVICE_URL=http://localhost:3004
VITE_FAVORITES_SERVICE_URL=http://localhost:3005
```

> All variables must use the VITE\_ prefix or Vite will not include them in the build.

---

## Running Locally For Development

Make sure [Node.js](https://nodejs.org/) is installed.

```bash
npm install
npm run dev
```

The app will be served at:

```
http://localhost:5173
```

---
