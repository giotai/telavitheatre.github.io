# Theatre Website (Firebase Auth+Firestore + Cloudinary Upload)

## Structure
- `/public` - public pages
- `/admin` - hidden admin panel (`/admin/login.html`)
- `/assets/css` - shared styles
- `/assets/js` - firebase + public/admin logic
- `/backend` - optional seed/helpers

## Admin Access
- URL: `/admin/login.html`
- Public pages contain no admin links.
- Login is `username + password` (Firebase Email/Password behind the scenes).

## Required config files
1. `assets/js/firebase-config.js`
- fill `firebaseConfig` values
- fill `adminAccount.username/email/uid`

2. `assets/js/upload-config.js`
- `cloudName`
- `unsignedPreset`
- `folder` (optional)

## Firebase Console setup
1. Enable Authentication -> Email/Password
2. Create one admin user and copy its UID
3. Create Firestore doc `settings/admin` with field:
   - `uid` (string) = admin UID

## Cloudinary setup (free uploads)
1. Create free Cloudinary account
2. Dashboard -> Settings -> Upload -> Upload presets
3. Create `Unsigned` preset
4. Copy:
   - Cloud name
   - Unsigned preset name
5. Paste in `assets/js/upload-config.js`

## Deploy (no Firebase Storage needed)
```bash
cd "/Users/giorgiimedashvili/Documents/New project/telavi-theatre"
npx firebase-tools@latest login
npx firebase-tools@latest deploy --only firestore:rules,firestore:indexes,hosting
```

## Collections
- `settings/site`
- `performances`
- `actors`
- `gallery`
- `news`
