# Telavi Theatre (Isolated Project)

ეს არის თეატრის დამოუკიდებელი პროექტი, შერევის გარეშე.

## სამუშაო დირექტორია
```bash
cd "/Users/giorgiimedashvili/Documents/New project/telavi-theatre"
```

## Deploy
```bash
npx firebase-tools@latest login
npx firebase-tools@latest deploy --only firestore:rules,firestore:indexes,hosting
```

## კონფიგი
- Firebase: `assets/js/firebase-config.js`
- Free image uploads (Cloudinary): `assets/js/upload-config.js`
