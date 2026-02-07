# GitHub Upload (Exact Steps)

ეს ფაილი გაძლევს ზუსტად იმ ბრძანებებს, რომ მიმდინარე თეატრის პროექტი ატვირთო GitHub-ზე სრულად.

## 1) შედი პროექტის საქაღალდეში
```bash
cd "/Users/giorgiimedashvili/Documents/New project/telavi-theatre"
```

## 2) შექმენი ახალი რეპოზიტორია GitHub-ზე
GitHub-ში შექმენი ახალი repo (მაგ: `telavi-theatre`) და არ დაუმატო README/.gitignore (ცარიელი იყოს).

## 3) გაუშვი ეს ბრძანებები ტერმინალში
`https://github.com/giotai/telavitheatre.git` შეცვალე შენი URL-ით.

HTTPS მაგალითი:
```bash
git init
git add .
git commit -m "Initial production-ready theatre website"
git branch -M main
git remote add origin https://github.com/giotai/telavitheatre.git
git push -u origin main
```

SSH მაგალითი:
```bash
git init
git add .
git commit -m "Initial production-ready theatre website"
git branch -M main
git remote add origin git@github.com:USERNAME/REPO.git
git push -u origin main
```

## 4) ატვირთვის შემდეგ რას ნახავ
GitHub repo-ში იქნება სრული პროექტი:
- `public/`
- `admin/`
- `assets/`
- `backend/`
- `firebase.json`, `firestore.rules`, `storage.rules`, `THEATRE_SETUP.md`

## 5) უსაფრთხოების შენიშვნა (რეკომენდაცია)
თუ რეპოზიტორია public იქნება, შემდეგ ეტაპზე შეცვალე Firebase `apiKey` (project settings-ში rotate) ან გახადე repo private.

## 6) შემდეგი deploy (როცა ცვლილებებს შეიტან)
```bash
cd "/Users/giorgiimedashvili/Documents/New project/telavi-theatre"
git add .
git commit -m "Update theatre content"
git push
npx firebase-tools@latest deploy --only firestore:rules,firestore:indexes,hosting
```
