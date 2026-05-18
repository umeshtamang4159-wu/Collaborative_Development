/* ============================================================
   UoW Navigator — Frontend Application
   ============================================================ */

// ── State ──────────────────────────────────────────────────
const state = {
  buildings:       [],
  favorites:       new Set(),
  user:            null,
  campus:          'all',
  category:        'all',
  search:          '',
  view:            'list',
  showFavorites:   false,
  map:             null,
  markers:         [],
  userMarker:      null,
  userPos:         null,
};

// ── Category badge class helper ─────────────────────────────
function catClass(cat) {
  return 'cat-' + (cat || '').replace(/\s+/g, '-');
}

// ── Fetch helpers ───────────────────────────────────────────
async function apiFetch(url, options = {}) {
  const r = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } });
  return r.json();
}

// ── Auth ────────────────────────────────────────────────────
async function loadUser() {
  try {
    const data = await apiFetch('api/me.php');
    state.user = data.authenticated ? data : null;
  } catch { state.user = null; }
  renderAuthArea();
}

function renderAuthArea() {
  const area = document.getElementById('auth-area');
  const banner = document.getElementById('login-banner');
  const btnSaved = document.getElementById('btn-saved');

  if (state.user) {
    area.innerHTML = `
      <div class="user-bar">
        <span class="user-name">${escHtml(state.user.name || state.user.email)}</span>
        <a href="logout.php" class="btn btn-outline btn-sm btn-rounded">Logout</a>
      </div>`;
    banner.style.display = 'none';
    btnSaved.style.display = '';
  } else {
    area.innerHTML = `<a href="login.php" class="btn btn-maroon btn-sm btn-rounded">🔑 Login</a>`;
    banner.style.display = '';
    btnSaved.style.display = 'none';
  }
}

// ── Favorites ───────────────────────────────────────────────
async function loadFavorites() {
  if (!state.user) return;
  try {
    const rows = await apiFetch('api/favorites.php');
    state.favorites = new Set((rows || []).map(r => r.building_id));
  } catch { state.favorites = new Set(); }
}

async function toggleFavorite(buildingId) {
  if (!state.user) { window.location.href = 'login.php'; return; }
  const method = state.favorites.has(buildingId) ? 'DELETE' : 'POST';
  await apiFetch('api/favorites.php', { method, body: JSON.stringify({ building_id: buildingId }) });
  if (method === 'DELETE') state.favorites.delete(buildingId);
  else state.favorites.add(buildingId);
  renderAll();
}

// ── Buildings ───────────────────────────────────────────────
async function loadBuildings() {
  document.getElementById('buildings-list').innerHTML = '<div class="loader">⏳</div>';
  const params = new URLSearchParams();
  if (state.campus   !== 'all') params.set('campus',   state.campus);
  if (state.category !== 'all') params.set('category', state.category);
  if (state.search)              params.set('search',   state.search);
  try {
    state.buildings = await apiFetch('api/buildings.php?' + params);
  } catch { state.buildings = []; }
  renderAll();
}

// ── Filtering ───────────────────────────────────────────────
function filteredBuildings() {
  let list = state.buildings;
  if (state.showFavorites && state.user) {
    list = list.filter(b => state.favorites.has(b.id));
  }
  return list;
}

// ── Rendering ───────────────────────────────────────────────
function renderAll() {
  const list = filteredBuildings();
  document.getElementById('results-count').textContent =
    list.length + ' ' + (list.length === 1 ? 'location' : 'locations') + ' found';

  if (state.view === 'list') renderList(list);
  else renderMap(list);

  // Update saved button style
  const btnSaved = document.getElementById('btn-saved');
  if (state.showFavorites) {
    btnSaved.classList.add('btn-saved-active');
    btnSaved.classList.remove('btn-outline');
  } else {
    btnSaved.classList.remove('btn-saved-active');
    btnSaved.classList.add('btn-outline');
  }
}

function renderList(list) {
  const container = document.getElementById('buildings-list');
  if (!list.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🗺️</div>
        <h3>No locations found</h3>
        <p>Try adjusting your filters or search query</p>
      </div>`;
    return;
  }

  // Group by category only when no special filter active
  const groupByCategory = state.category === 'all' && !state.showFavorites && !state.search.trim();

  if (groupByCategory) {
    const groups = {};
    list.forEach(b => { const c = b.category || 'Other'; (groups[c] = groups[c] || []).push(b); });
    container.innerHTML = Object.entries(groups).map(([cat, buildings]) => `
      <div class="cat-group-header">${escHtml(cat)} <span>(${buildings.length})</span></div>
      <div class="buildings-list">${buildings.map(buildingCardHTML).join('')}</div>
    `).join('');
  } else {
    container.innerHTML = `<div class="buildings-list">${list.map(buildingCardHTML).join('')}</div>`;
  }

  // Attach events
  container.querySelectorAll('.building-card').forEach(card => {
    const id = Number(card.dataset.id);
    card.addEventListener('click', e => {
      if (e.target.closest('.building-fav')) return;
      const b = state.buildings.find(x => x.id === id);
      if (b) openModal(b);
    });
  });
  container.querySelectorAll('.building-fav').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleFavorite(Number(btn.dataset.id));
    });
  });
}

function buildingCardHTML(b) {
  const fav = state.favorites.has(b.id);
  const img = b.image_url ? `<img src="${escHtml(b.image_url)}" alt="${escHtml(b.name)}" class="building-img" loading="lazy"/>` : '';
  return `
    <div class="building-card" data-id="${b.id}">
      ${img}
      <div class="building-body">
        <div class="building-meta">
          ${b.code ? `<span class="building-code">${escHtml(b.code)}</span>` : ''}
          <span class="cat-badge ${catClass(b.category)}">${escHtml(b.category)}</span>
        </div>
        <div class="building-name">${escHtml(b.name)}</div>
        <div class="building-campus">📍 ${escHtml(b.campus)}</div>
        ${b.opening_hours ? `<div class="building-hours">🕐 ${escHtml(b.opening_hours)}</div>` : ''}
      </div>
      <button class="building-fav ${fav ? 'is-fav' : ''}" data-id="${b.id}" title="${fav ? 'Remove from saved' : 'Save'}">
        ${fav ? '♥' : '♡'}
      </button>
      <div class="building-chevron">›</div>
    </div>`;
}

// ── Map ──────────────────────────────────────────────────────
const CAMPUS_VIEWS = {
  'City Campus':    { lat: 52.58805, lng: -2.12748, zoom: 17 },
  'Walsall Campus': { lat: 52.58550, lng: -1.98250, zoom: 17 },
  'Telford Campus': { lat: 52.68080, lng: -2.44970, zoom: 17 },
  'all':            { lat: 52.58805, lng: -2.12748, zoom: 16 },
};

function buildingIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="width:24px;height:24px;background:#800000;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.35)"></div>`,
    iconSize: [24, 24], iconAnchor: [12, 24], popupAnchor: [0, -26],
  });
}

function userIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="width:16px;height:16px;background:#2563EB;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 5px rgba(37,99,235,0.2),0 2px 8px rgba(0,0,0,0.3)"></div>`,
    iconSize: [16, 16], iconAnchor: [8, 8],
  });
}

function initMap() {
  if (state.map) return;
  const v = CAMPUS_VIEWS[state.campus] || CAMPUS_VIEWS['all'];
  state.map = L.map('map', { scrollWheelZoom: false }).setView([v.lat, v.lng], v.zoom);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(state.map);
  state.map.invalidateSize();
}

function renderMap(list) {
  initMap();

  // Remove old markers
  state.markers.forEach(m => m.remove());
  state.markers = [];

  const v = CAMPUS_VIEWS[state.campus] || CAMPUS_VIEWS['all'];
  state.map.flyTo([v.lat, v.lng], v.zoom, { animate: true, duration: 0.8 });

  const withCoords = list.filter(b => b.latitude && b.longitude);

  withCoords.forEach(b => {
    const marker = L.marker([Number(b.latitude), Number(b.longitude)], { icon: buildingIcon() }).addTo(state.map);
    const img = b.image_url ? `<img src="${escHtml(b.image_url)}" style="width:100%;height:80px;object-fit:cover;border-radius:8px;margin-bottom:8px;display:block" loading="lazy"/>` : '';
    marker.bindPopup(`
      <div style="min-width:200px">
        ${img}
        <div style="font-weight:700;font-size:13px;margin-bottom:2px">${escHtml(b.name)}</div>
        ${b.code ? `<div style="font-size:11px;color:#d97706;font-weight:600">Code: ${escHtml(b.code)}</div>` : ''}
        <div style="font-size:11px;color:#64748b;margin-bottom:4px">${escHtml(b.campus)}</div>
        ${b.opening_hours ? `<div style="font-size:11px;margin-bottom:8px">🕐 ${escHtml(b.opening_hours)}</div>` : ''}
        <div style="display:flex;gap:6px">
          <button onclick="mapNavigate(${Number(b.latitude)},${Number(b.longitude)})"
            style="flex:1;background:#800000;color:#fff;border:none;border-radius:7px;padding:7px;font-weight:700;font-size:12px;cursor:pointer">
            🧭 Navigate
          </button>
          <button onclick="mapDetails(${b.id})"
            style="flex:1;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:7px;padding:7px;font-weight:600;font-size:12px;cursor:pointer">
            ℹ️ Details
          </button>
        </div>
      </div>
    `, { minWidth: 210 });
    state.markers.push(marker);
  });

  document.getElementById('map-count').textContent = withCoords.length + ' building' + (withCoords.length !== 1 ? 's' : '') + ' on map';
  state.map.invalidateSize();
}

// Global helpers called from Leaflet popup buttons
window.mapNavigate = function(lat, lng) {
  const dest = `${lat},${lng}`;
  if (state.userPos) {
    window.open(`https://www.google.com/maps/dir/${state.userPos[0]},${state.userPos[1]}/${dest}`, '_blank');
  } else {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=walking`, '_blank');
  }
};
window.mapDetails = function(id) {
  const b = state.buildings.find(x => x.id == id);
  if (b) openModal(b);
};

// Locate me
document.getElementById('btn-locate').addEventListener('click', () => {
  if (!navigator.geolocation) {
    showGeoError('Geolocation is not supported by your browser.');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const pos = [coords.latitude, coords.longitude];
      state.userPos = pos;
      if (state.userMarker) state.userMarker.remove();
      state.userMarker = L.marker(pos, { icon: userIcon() }).addTo(state.map);
      state.userMarker.bindPopup('<b style="color:#2563EB">📍 You are here</b>');
      state.map.flyTo(pos, 18, { animate: true, duration: 1 });
      document.getElementById('geo-error').style.display = 'none';
    },
    (err) => {
      const msgs = {1:'Location access denied.', 2:'Location unavailable.', 3:'Location request timed out.'};
      showGeoError(msgs[err.code] || 'Could not get your location.');
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  );
});

function showGeoError(msg) {
  const el = document.getElementById('geo-error');
  el.innerHTML = msg + ' <button onclick="this.parentElement.style.display=\'none\'">✕</button>';
  el.style.display = 'flex';
}

// ── Building Detail Modal ─────────────────────────────────
function openModal(b) {
  const fav = state.favorites.has(b.id);
  const facilities   = Array.isArray(b.facilities)    ? b.facilities    : [];
  const accessibility = Array.isArray(b.accessibility) ? b.accessibility : [];

  const heroSection = b.image_url ? `
    <div style="position:relative">
      <img src="${escHtml(b.image_url)}" class="modal-hero" alt="${escHtml(b.name)}"/>
      <div class="modal-hero-overlay" style="position:absolute;bottom:0;left:0;right:0">
        <span class="cat-badge ${catClass(b.category)}" style="display:inline-block;margin-bottom:6px">${escHtml(b.category)}</span>
        <div class="modal-title">${escHtml(b.name)}</div>
      </div>
    </div>
  ` : `
    <div style="padding:20px 18px 0">
      <span class="cat-badge ${catClass(b.category)}" style="display:inline-block;margin-bottom:8px">${escHtml(b.category)}</span>
      <div style="font-size:1.5rem;font-weight:800">${escHtml(b.name)}</div>
    </div>
  `;

  const mapsUrl = b.latitude && b.longitude
    ? `https://www.google.com/maps/dir/?api=1&destination=${b.latitude},${b.longitude}`
    : '#';

  document.getElementById('modal-body').innerHTML = `
    ${heroSection}
    <div class="modal-content">
      <div class="modal-actions">
        <button class="btn-directions" onclick="window.open('${mapsUrl}','_blank')">🧭 Get Directions</button>
        <button class="btn-icon-action" id="modal-fav-btn" data-id="${b.id}" title="Save">${fav ? '♥' : '♡'}</button>
        <button class="btn-icon-action" onclick="shareBuilding('${escHtml(b.name)}')" title="Share">🔗</button>
      </div>

      <div class="info-card"><div class="info-icon">📍</div><div><div class="info-label">Campus</div><div class="info-value">${escHtml(b.campus)}</div></div></div>
      ${b.code        ? `<div class="info-card"><div class="info-icon">🏢</div><div><div class="info-label">Building Code</div><div class="info-value">${escHtml(b.code)}</div></div></div>` : ''}
      ${b.opening_hours ? `<div class="info-card"><div class="info-icon">🕐</div><div><div class="info-label">Opening Hours</div><div class="info-value">${escHtml(b.opening_hours)}</div></div></div>` : ''}
      ${b.floor_count  ? `<div class="info-card"><div class="info-icon">🏗️</div><div><div class="info-label">Floors</div><div class="info-value">${b.floor_count} floors</div></div></div>` : ''}

      ${b.description ? `<div class="section-title">About</div><p style="font-size:0.88rem;color:#475569;line-height:1.6">${escHtml(b.description)}</p>` : ''}

      ${facilities.length ? `
        <div class="section-title">Facilities</div>
        <div class="tags-wrap">${facilities.map(f => `<span class="tag">${escHtml(f)}</span>`).join('')}</div>
      ` : ''}

      ${accessibility.length ? `
        <div class="section-title">♿ Accessibility</div>
        <div class="tags-wrap">${accessibility.map(a => `<span class="tag tag-green">${escHtml(a)}</span>`).join('')}</div>
      ` : ''}
    </div>
  `;

  // Fav button in modal
  document.getElementById('modal-fav-btn').addEventListener('click', async () => {
    await toggleFavorite(b.id);
    const newFav = state.favorites.has(b.id);
    const btn = document.getElementById('modal-fav-btn');
    if (btn) btn.textContent = newFav ? '♥' : '♡';
  });

  document.getElementById('modal-overlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

window.shareBuilding = function(name) {
  if (navigator.share) navigator.share({ title: name, text: `Check out ${name} at University of Wolverhampton` });
};

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
});
function closeModal() {
  document.getElementById('modal-overlay').style.display = 'none';
  document.body.style.overflow = '';
}

// ── Controls ─────────────────────────────────────────────────

// Campus selector
document.getElementById('campus-selector').addEventListener('click', e => {
  const btn = e.target.closest('.campus-btn');
  if (!btn) return;
  document.querySelectorAll('.campus-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.campus = btn.dataset.campus;
  loadBuildings();
});

// Category filter
document.getElementById('category-filter').addEventListener('click', e => {
  const btn = e.target.closest('.cat-btn');
  if (!btn) return;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.category = btn.dataset.cat;
  loadBuildings();
});

// Search
let searchTimer = null;
document.getElementById('search-input').addEventListener('input', e => {
  const val = e.target.value;
  document.getElementById('search-clear').style.display = val ? '' : 'none';
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.search = val;
    loadBuildings();
  }, 300);
});
document.getElementById('search-clear').addEventListener('click', () => {
  document.getElementById('search-input').value = '';
  document.getElementById('search-clear').style.display = 'none';
  state.search = '';
  loadBuildings();
});

// View toggle
document.getElementById('btn-list').addEventListener('click', () => {
  state.view = 'list';
  document.getElementById('btn-list').classList.add('active');
  document.getElementById('btn-map').classList.remove('active');
  document.getElementById('list-view').style.display = '';
  document.getElementById('map-view').style.display = 'none';
  renderAll();
});
document.getElementById('btn-map').addEventListener('click', () => {
  state.view = 'map';
  document.getElementById('btn-map').classList.add('active');
  document.getElementById('btn-list').classList.remove('active');
  document.getElementById('list-view').style.display = 'none';
  document.getElementById('map-view').style.display = '';
  renderAll();
  // Invalidate size after display:block
  setTimeout(() => { if (state.map) state.map.invalidateSize(); }, 100);
});

// Saved / favorites toggle
document.getElementById('btn-saved').addEventListener('click', () => {
  state.showFavorites = !state.showFavorites;
  renderAll();
});

// ── Helpers ──────────────────────────────────────────────────
function escHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Boot ─────────────────────────────────────────────────────
(async () => {
  await loadUser();
  await loadFavorites();
  await loadBuildings();
})();
