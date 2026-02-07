import {
  ready,
  db,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy
} from "./firebase-client.js";
import { collections } from "./firebase-config.js";

let cache = null;

async function loadMock() {
  if (cache) return cache;
  const res = await fetch("../assets/data/mock-data.json");
  cache = await res.json();
  return cache;
}

async function getSettings() {
  if (!ready || !db) {
    const mock = await loadMock();
    return mock.settings.site;
  }

  const snap = await getDoc(doc(db, collections.settings, "site"));
  if (!snap.exists()) {
    return {
      hero_title: "თელავის დრამატული თეატრი",
      hero_slogan: "ცოცხალი სცენა კახეთის გულში",
      contact_phone: "",
      contact_email: "",
      global_ticket_url: ""
    };
  }
  return snap.data();
}

async function listItems(name, sortField = "createdAt") {
  if (!ready || !db) {
    const mock = await loadMock();
    return mock[name] || [];
  }

  const ref = collection(db, collections[name] || name);
  let q = ref;
  if (sortField) {
    q = query(ref, orderBy(sortField, "desc"));
  }
  const snaps = await getDocs(q);
  return snaps.docs.map((d) => ({ id: d.id, ...d.data() }));
}

function resolveTicket(performance, settings) {
  return performance.ticketUrl || settings.global_ticket_url || "#";
}

export { getSettings, listItems, resolveTicket };
