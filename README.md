# PartyEvent (Maneesh Events)

React + Vite site with an optional Node/Express API for syncing site content across devices.

## Setup

- Install: `npm install`
- Run the site: `npm run dev`

## Admin login (local-only mode)

If `VITE_SITE_DATA_API_BASE` is not set, edits are saved to `localStorage` on the current device only.

Set in `.env` (see `.env.example`):

- `VITE_ADMIN_USERNAME`
- `VITE_ADMIN_PASSWORD`

## Cross-device sync (optional server)

1. Set `VITE_SITE_DATA_API_BASE` in `.env` (example: `http://localhost:5174`).
2. Configure server credentials in `.env`:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
3. Run the API in another terminal: `npm run server`

The API stores the current site data in `SITE_DATA_FILE` (default: `./server/data/site-data.json`).

## Firebase image log (optional)

If Firebase is configured, every successful Cloudinary upload is also recorded in Firebase as a simple URL log.

- Configure `.env` using the `VITE_FIREBASE_*` vars in `.env.example`.
- If `VITE_FIREBASE_DATABASE_URL` is set, it logs to Realtime Database at `cloudinaryUploads/`.
- Otherwise it logs to Firestore collection `cloudinaryUploads`.
