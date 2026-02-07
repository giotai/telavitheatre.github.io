/* eslint-disable no-console */
const admin = require("firebase-admin");
const {
  COLLECTIONS,
  SETTINGS_DOC_ID,
  normalizePerformance,
  normalizeActor,
  normalizeGallery,
  normalizeNews
} = require("./database");

function initAdmin() {
  if (admin.apps.length) return;
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  });
}

async function seedDefaults() {
  initAdmin();
  const db = admin.firestore();
  const now = admin.firestore.FieldValue.serverTimestamp();

  await db.collection(COLLECTIONS.SETTINGS).doc(SETTINGS_DOC_ID).set(
    {
      hero_title: "თელავის დრამატული თეატრი",
      hero_slogan: "ცოცხალი სცენა კახეთის გულში",
      contact_phone: "+995 350 27 23 91",
      contact_email: "info@telavitheatre.ge",
      global_ticket_url: "https://example.com/tickets",
      updatedAt: now
    },
    { merge: true }
  );

  const perf = normalizePerformance({
    title: "ყვარყვარე თუთაბერი",
    author: "მიხეილ ჯავახიშვილი",
    genre: "დრამა",
    age: "12+",
    duration: "2სთ 20წთ"
  });
  await db.collection(COLLECTIONS.PERFORMANCES).add({ ...perf, createdAt: now, updatedAt: now });

  const actor = normalizeActor({
    name: "გიორგი გიორგაძე",
    role: "მთავარი მსახიობი",
    type: "actors",
    bio: "დასის წევრი 2005 წლიდან"
  });
  await db.collection(COLLECTIONS.ACTORS).add({ ...actor, createdAt: now, updatedAt: now });

  const gallery = normalizeGallery({ title: "სცენა" });
  await db.collection(COLLECTIONS.GALLERY).add({ ...gallery, createdAt: now, updatedAt: now });

  const news = normalizeNews({
    title: "ახალი სეზონის გახსნა",
    type: "პრემიერა",
    date: "2026-02-01",
    excerpt: "სეზონი გაიხსნა პრემიერით"
  });
  await db.collection(COLLECTIONS.NEWS).add({ ...news, createdAt: now, updatedAt: now });

  console.log("Seed completed");
}

if (require.main === module) {
  seedDefaults().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { seedDefaults };
