// Shared Firebase data model (document keys).
const COLLECTIONS = {
  SETTINGS: "settings",
  PERFORMANCES: "performances",
  ACTORS: "actors",
  GALLERY: "gallery",
  NEWS: "news"
};

const SETTINGS_DOC_ID = "site";

function cleanString(input) {
  return String(input || "").trim();
}

function normalizePerformance(data = {}) {
  return {
    title: cleanString(data.title),
    author: cleanString(data.author),
    genre: cleanString(data.genre),
    age: cleanString(data.age),
    duration: cleanString(data.duration),
    ticketUrl: cleanString(data.ticketUrl),
    image: cleanString(data.image),
    imagePath: cleanString(data.imagePath)
  };
}

function normalizeActor(data = {}) {
  return {
    name: cleanString(data.name),
    role: cleanString(data.role),
    type: cleanString(data.type || "actors"),
    bio: cleanString(data.bio),
    image: cleanString(data.image),
    imagePath: cleanString(data.imagePath)
  };
}

function normalizeGallery(data = {}) {
  return {
    title: cleanString(data.title),
    image: cleanString(data.image),
    imagePath: cleanString(data.imagePath)
  };
}

function normalizeNews(data = {}) {
  return {
    title: cleanString(data.title),
    type: cleanString(data.type),
    date: cleanString(data.date),
    excerpt: cleanString(data.excerpt),
    content: cleanString(data.content),
    image: cleanString(data.image),
    imagePath: cleanString(data.imagePath)
  };
}

module.exports = {
  COLLECTIONS,
  SETTINGS_DOC_ID,
  normalizePerformance,
  normalizeActor,
  normalizeGallery,
  normalizeNews
};
