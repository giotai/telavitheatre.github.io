import { getSettings, listItems, resolveTicket } from "./public-data.js";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeImage(url) {
  if (!url) return "";
  return `<img src="${escapeHtml(url)}" alt="" class="photo">`;
}

async function renderRepertoire() {
  const settings = await getSettings();
  const list = await listItems("performances", "createdAt");
  const holder = document.getElementById("repertoire-list");
  if (!holder) return;

  if (!list.length) {
    holder.innerHTML = '<div class="empty">რეპერტუარი დროებით ცარიელია.</div>';
    return;
  }

  holder.innerHTML = list
    .map((item) => {
      const link = resolveTicket(item, settings);
      return `<article class="card">
        ${safeImage(item.image)}
        <h3>${escapeHtml(item.title)}</h3>
        <p class="muted">${escapeHtml(item.author || "")}</p>
        <p class="muted">${escapeHtml(item.genre || "")} | ${escapeHtml(item.age || "")} | ${escapeHtml(item.duration || "")}</p>
        <a class="btn-gold" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">ბილეთის ყიდვა</a>
      </article>`;
    })
    .join("");
}

async function renderActors() {
  const list = await listItems("actors", "createdAt");
  const holder = document.getElementById("actor-list");
  if (!holder) return;

  if (!list.length) {
    holder.innerHTML = '<div class="empty">დასის მონაცემები ჯერ არ არის დამატებული.</div>';
    return;
  }

  holder.innerHTML = list
    .map(
      (item) => `<article class="card">
      ${safeImage(item.image)}
      <h3>${escapeHtml(item.name)}</h3>
      <p class="muted">${escapeHtml(item.role || "")}</p>
      <p class="muted">${escapeHtml(item.bio || "")}</p>
    </article>`
    )
    .join("");
}

async function renderGallery() {
  const list = await listItems("gallery", "createdAt");
  const holder = document.getElementById("gallery-list");
  if (!holder) return;

  if (!list.length) {
    holder.innerHTML = '<div class="empty">გალერია დროებით ცარიელია.</div>';
    return;
  }

  holder.innerHTML = list
    .map(
      (item) => `<figure class="card">
      ${safeImage(item.image)}
      <figcaption class="muted">${escapeHtml(item.title || "")}</figcaption>
    </figure>`
    )
    .join("");
}

async function renderNews() {
  const list = await listItems("news", "date");
  const holder = document.getElementById("news-list");
  if (!holder) return;

  if (!list.length) {
    holder.innerHTML = '<div class="empty">სიახლეები ჯერ არ არის დამატებული.</div>';
    return;
  }

  holder.innerHTML = list
    .map(
      (item) => `<article class="card">
      ${safeImage(item.image)}
      <p class="muted">${escapeHtml(item.date || "")}</p>
      <h3>${escapeHtml(item.title || "")}</h3>
      <p class="muted">${escapeHtml(item.excerpt || "")}</p>
      <p>${escapeHtml(item.content || "")}</p>
    </article>`
    )
    .join("");
}

async function renderContact() {
  const settings = await getSettings();
  const phone = document.getElementById("contact-phone");
  const email = document.getElementById("contact-email");
  const globalTicket = document.getElementById("global-ticket-link");

  if (phone) phone.textContent = settings.contact_phone || "";
  if (email) email.textContent = settings.contact_email || "";
  if (globalTicket) {
    globalTicket.href = settings.global_ticket_url || "#";
  }
}

async function init() {
  const page = document.body.dataset.page;
  if (page === "repertuari") await renderRepertoire();
  if (page === "dasi") await renderActors();
  if (page === "galeria") await renderGallery();
  if (page === "siakhleebi") await renderNews();
  if (page === "kontakti") await renderContact();
}

init().catch((err) => {
  const target = document.getElementById("page-error");
  if (target) target.textContent = `შეცდომა: ${err.message}`;
});
