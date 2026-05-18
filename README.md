# UoW Navigator — PHP/MySQL Version

Complete self-contained app. No build step required.

## Folder Structure

```
uow-navigator/
├── index.html          ← Main app page
├── login.php           ← Login page
├── register.php        ← Register page
├── logout.php          ← Logout handler
├── css/
│   └── style.css
├── js/
│   └── app.js
├── api/
│   ├── buildings.php   ← GET buildings (with filters)
│   ├── favorites.php   ← GET/POST/DELETE favorites
│   └── me.php          ← GET current user session
├── includes/
│   ├── db.php          ← PDO database connection + session_start()
│   └── auth.php        ← Auth helper functions
└── database/
    └── schema.sql      ← Run this to create tables + sample data
```

---

## Setup Instructions

### 1. Requirements
- PHP 7.4+
- MySQL 5.7+ or MariaDB 10.3+
- A web server: Apache (XAMPP/WAMP) or Nginx with PHP-FPM

### 2. Create the Database
Open **phpMyAdmin** (or MySQL CLI) and run:
```sql
SOURCE /path/to/uow-navigator/database/schema.sql;
```
Or paste the contents of `database/schema.sql` into phpMyAdmin's SQL tab.

### 3. Configure DB Connection
Edit `includes/db.php` and update these 4 lines:
```php
define('DB_HOST', 'localhost');   // your MySQL host
define('DB_NAME', 'uow_navigator'); // database name
define('DB_USER', 'root');        // MySQL username
define('DB_PASS', '');            // MySQL password
```

### 4. Deploy
Copy the entire `uow-navigator/` folder into your web server's root:
- **XAMPP**: `C:/xampp/htdocs/uow-navigator/`
- **WAMP**: `C:/wamp64/www/uow-navigator/`
- **Linux/Nginx**: `/var/www/html/uow-navigator/`

Then open: `http://localhost/uow-navigator/`

---

## Features
- 🔍 Search buildings by name, code, or description
- 🏫 Filter by campus (City, Walsall, Telford)
- 🗂️ Filter by category (Academic, Library, Sports, etc.)
- 🗺️ Interactive Leaflet map with building pins
- 📍 "Locate me" button to show user's GPS position
- 🧭 Google Maps walking directions from any building
- ♥ Save/favourite buildings (requires login)
- 👤 User registration & login with PHP sessions
- 📱 Fully responsive — works on mobile & desktop

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `api/buildings.php` | List buildings (optional: `?campus=&category=&search=`) |
| GET | `api/favorites.php` | List user's favorites (auth required) |
| POST | `api/favorites.php` | Add favorite `{building_id: N}` (auth required) |
| DELETE | `api/favorites.php` | Remove favorite `{building_id: N}` (auth required) |
| GET | `api/me.php` | Get current user session info |
| GET | `login.php` | Login form |
| GET | `register.php` | Register form |
| GET | `logout.php` | Destroy session & redirect |
