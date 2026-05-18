/* ============================================================
   UoW Navigator — Stylesheet
   ============================================================ */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --maroon: #800000;
  --maroon-dark: #5a0000;
  --amber: #f59e0b;
  --slate-50: #f8fafc;
  --slate-100: #f1f5f9;
  --slate-200: #e2e8f0;
  --slate-400: #94a3b8;
  --slate-500: #64748b;
  --slate-700: #334155;
  --slate-900: #0f172a;
  --radius: 16px;
}

body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: linear-gradient(to bottom, #fffbeb 0%, #fff 300px); min-height: 100vh; color: var(--slate-900); }

/* ── Header ── */
.header { background: #fff; border-bottom: 1px solid var(--slate-100); position: sticky; top: 0; z-index: 500; padding: 14px 16px 10px; }
.header-inner { max-width: 720px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.brand h1 { font-size: 1.4rem; font-weight: 800; }
.brand p { font-size: 0.75rem; color: var(--slate-500); }
.accent { color: var(--amber); }
.header-actions { display: flex; align-items: center; gap: 8px; }
.header-search { max-width: 720px; margin: 10px auto 0; }
.search-wrap { position: relative; }
.search-wrap input { width: 100%; padding: 14px 44px; border: 1.5px solid var(--slate-200); border-radius: 14px; font-size: 1rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s; background: #fff; }
.search-wrap input:focus { border-color: var(--amber); box-shadow: 0 0 0 3px rgba(245,158,11,0.15); }
.search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 1.1rem; pointer-events: none; }
.search-clear { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 1rem; color: var(--slate-400); padding: 4px 8px; }

/* ── Login Banner ── */
.login-banner { background: #fffbeb; border-bottom: 1px solid #fde68a; padding: 10px 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 0.85rem; color: #92400e; max-width: 100%; }

/* ── Main ── */
.main { max-width: 720px; margin: 0 auto; padding: 20px 16px 60px; display: flex; flex-direction: column; gap: 18px; }

/* ── Buttons ── */
.btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border: 1.5px solid transparent; border-radius: 8px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.15s; text-decoration: none; }
.btn-sm { padding: 6px 12px; font-size: 0.78rem; }
.btn-rounded { border-radius: 999px; }
.btn-full { width: 100%; justify-content: center; }
.btn-maroon { background: var(--maroon); color: #fff; border-color: var(--maroon); }
.btn-maroon:hover { background: var(--maroon-dark); border-color: var(--maroon-dark); }
.btn-outline { background: #fff; color: var(--slate-700); border-color: var(--slate-200); }
.btn-outline:hover { background: var(--slate-50); }
.btn-saved-active { background: #e11d48; color: #fff; border-color: #e11d48; }

/* ── Campus Selector ── */
.campus-selector { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
.campus-selector::-webkit-scrollbar { display: none; }
.campus-btn { flex-shrink: 0; padding: 8px 18px; border-radius: 999px; border: 1.5px solid var(--slate-200); background: #fff; color: var(--slate-700); font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.15s; white-space: nowrap; }
.campus-btn.active { background: var(--maroon); color: #fff; border-color: var(--maroon); box-shadow: 0 4px 12px rgba(128,0,0,0.2); }

/* ── Category Filter ── */
.category-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
@media (min-width: 520px) { .category-grid { grid-template-columns: repeat(8, 1fr); } }
.cat-btn { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 4px; border-radius: 14px; border: 1.5px solid var(--slate-100); background: #fff; color: var(--slate-600); font-size: 0.7rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.cat-btn span { display: block; text-align: center; }
.cat-btn.active { background: var(--maroon); color: #fff; border-color: var(--maroon); box-shadow: 0 4px 12px rgba(128,0,0,0.25); }
.cat-btn:not(.active):hover { background: var(--slate-50); }

/* ── View Bar ── */
.view-bar { display: flex; align-items: center; justify-content: space-between; }
.results-count { font-size: 0.82rem; color: var(--slate-500); }
.view-toggle { display: flex; background: var(--slate-100); border-radius: 999px; padding: 3px; gap: 2px; }
.view-btn { padding: 6px 14px; border: none; border-radius: 999px; background: transparent; font-size: 0.82rem; font-weight: 600; color: var(--slate-500); cursor: pointer; transition: all 0.15s; }
.view-btn.active { background: #fff; color: var(--slate-900); box-shadow: 0 1px 4px rgba(0,0,0,0.08); }

/* ── Building Cards ── */
.buildings-list { display: flex; flex-direction: column; gap: 12px; }
.building-card { background: #fff; border: 1.5px solid var(--slate-100); border-radius: var(--radius); overflow: hidden; cursor: pointer; display: flex; transition: box-shadow 0.2s, transform 0.15s; }
.building-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.1); transform: translateY(-2px); }
.building-img { width: 110px; height: 110px; flex-shrink: 0; object-fit: cover; }
.building-body { flex: 1; padding: 12px 14px; min-width: 0; }
.building-meta { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; flex-wrap: wrap; }
.building-code { font-size: 0.7rem; font-weight: 800; padding: 2px 7px; border-radius: 6px; background: #fff5f5; color: var(--maroon); }
.cat-badge { font-size: 0.68rem; font-weight: 600; padding: 2px 8px; border-radius: 999px; }
.building-name { font-size: 0.95rem; font-weight: 700; color: var(--slate-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.building-campus { font-size: 0.78rem; color: var(--slate-500); margin-top: 3px; }
.building-hours { font-size: 0.72rem; color: var(--slate-400); margin-top: 6px; }
.building-fav { flex-shrink: 0; background: none; border: none; cursor: pointer; padding: 6px; font-size: 1.1rem; color: var(--slate-300); transition: color 0.15s; }
.building-fav.is-fav { color: var(--maroon); }
.building-chevron { display: flex; align-items: center; padding-right: 10px; color: var(--slate-300); font-size: 1.1rem; }

/* Category badge colours */
.cat-Academic { background: #dbeafe; color: #1d4ed8; }
.cat-Library { background: #ede9fe; color: #7c3aed; }
.cat-Student-Services { background: #d1fae5; color: #065f46; }
.cat-Catering { background: #ffedd5; color: #c2410c; }
.cat-Sports { background: #ffe4e6; color: #be123c; }
.cat-Accommodation { background: #cffafe; color: #0e7490; }
.cat-Administration { background: #f1f5f9; color: #475569; }

/* ── Category group headers ── */
.cat-group-header { font-size: 0.75rem; font-weight: 700; color: var(--slate-500); text-transform: uppercase; letter-spacing: 0.07em; margin: 4px 0 10px 2px; }
.cat-group-header span { color: var(--amber); }

/* ── Empty state ── */
.empty-state { text-align: center; padding: 60px 20px; }
.empty-icon { font-size: 3rem; margin-bottom: 12px; }
.empty-state h3 { font-size: 1rem; font-weight: 700; margin-bottom: 6px; }
.empty-state p { font-size: 0.85rem; color: var(--slate-500); }

/* ── Map ── */
.map-info-bar { background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px 10px 0 0; padding: 8px 14px; font-size: 0.78rem; color: #92400e; }
.geo-error { background: #fef2f2; border: 1px solid #fecaca; padding: 8px 14px; font-size: 0.78rem; color: #b91c1c; display: flex; justify-content: space-between; align-items: center; }
.geo-error button { background: none; border: none; cursor: pointer; color: #b91c1c; font-size: 1rem; }
.map-container-wrap { position: relative; }
#map { height: 460px; width: 100%; border: 1px solid var(--slate-200); }
.locate-btn { position: absolute; bottom: 14px; right: 10px; z-index: 1000; width: 42px; height: 42px; border-radius: 50%; background: #fff; border: 2px solid var(--slate-200); font-size: 1.1rem; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.18); display: flex; align-items: center; justify-content: center; transition: border-color 0.2s; }
.locate-btn:hover { border-color: var(--amber); }
.map-legend { background: var(--slate-50); border: 1px solid var(--slate-100); border-top: none; border-radius: 0 0 10px 10px; padding: 8px 14px; display: flex; align-items: center; gap: 14px; font-size: 0.72rem; color: var(--slate-500); }
.dot { width: 12px; height: 12px; display: inline-block; border-radius: 50%; }
.dot.maroon { background: var(--maroon); border-radius: 50% 50% 50% 0; transform: rotate(-45deg); }
.dot.blue { background: #2563eb; }
.map-count { margin-left: auto; font-size: 0.68rem; }

/* ── Modal / Detail Sheet ── */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 800; display: flex; align-items: flex-end; }
.modal-sheet { background: #fff; border-radius: 24px 24px 0 0; width: 100%; max-height: 88vh; overflow-y: auto; padding: 0; position: relative; animation: slideUp 0.3s ease; }
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
.modal-close { position: absolute; top: 16px; right: 16px; z-index: 10; background: rgba(0,0,0,0.4); color: #fff; border: none; border-radius: 50%; width: 32px; height: 32px; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.modal-hero { width: 100%; height: 190px; object-fit: cover; display: block; }
.modal-hero-overlay { background: linear-gradient(to top, rgba(0,0,0,0.6), transparent); padding: 16px; }
.modal-title { font-size: 1.5rem; font-weight: 800; color: #fff; }
.modal-content { padding: 20px 18px 40px; }
.modal-actions { display: flex; gap: 10px; margin-bottom: 20px; }
.btn-directions { flex: 1; padding: 14px; background: var(--maroon); color: #fff; border: none; border-radius: 14px; font-size: 0.9rem; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.btn-directions:hover { background: var(--maroon-dark); }
.btn-icon-action { width: 52px; height: 52px; border-radius: 14px; border: 1.5px solid var(--slate-200); background: #fff; font-size: 1.2rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
.btn-icon-action:hover { background: var(--slate-50); }
.info-card { display: flex; align-items: center; gap: 14px; background: var(--slate-50); border-radius: 14px; padding: 14px; margin-bottom: 10px; }
.info-icon { width: 46px; height: 46px; background: #fff; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; box-shadow: 0 1px 4px rgba(0,0,0,0.08); flex-shrink: 0; }
.info-label { font-size: 0.75rem; color: var(--slate-500); margin-bottom: 2px; }
.info-value { font-size: 0.9rem; font-weight: 700; }
.section-title { font-size: 0.9rem; font-weight: 700; margin-bottom: 10px; margin-top: 16px; }
.tags-wrap { display: flex; flex-wrap: wrap; gap: 6px; }
.tag { font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 999px; background: var(--slate-100); color: var(--slate-700); }
.tag-green { background: #d1fae5; color: #065f46; }

/* ── Auth Pages ── */
.auth-page { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: linear-gradient(135deg, #fff5f5 0%, #fff 60%); }
.auth-card { background: #fff; border-radius: 20px; padding: 36px 32px; width: 100%; max-width: 400px; box-shadow: 0 8px 40px rgba(0,0,0,0.1); }
.auth-card h2 { font-size: 1.6rem; font-weight: 800; margin-bottom: 4px; }
.auth-sub { color: var(--slate-500); font-size: 0.88rem; margin-bottom: 24px; }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 0.82rem; font-weight: 600; color: var(--slate-700); margin-bottom: 6px; }
.form-group input { width: 100%; padding: 11px 14px; border: 1.5px solid var(--slate-200); border-radius: 10px; font-size: 0.9rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
.form-group input:focus { border-color: var(--maroon); box-shadow: 0 0 0 3px rgba(128,0,0,0.1); }
.auth-footer { font-size: 0.82rem; color: var(--slate-500); text-align: center; margin-top: 16px; }
.auth-footer a { color: var(--maroon); font-weight: 600; text-decoration: none; }
.alert { padding: 10px 14px; border-radius: 10px; font-size: 0.82rem; margin-bottom: 16px; font-weight: 500; }
.alert-error { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

/* ── User bar (top right) ── */
.user-bar { display: flex; align-items: center; gap: 8px; font-size: 0.82rem; color: var(--slate-600); }
.user-name { max-width: 110px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* ── Loader ── */
.loader { display: flex; justify-content: center; padding: 60px 0; font-size: 2rem; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
