-- ============================================================
--  UoW Navigator — MySQL Database Schema
--  Run this file in phpMyAdmin or MySQL CLI:
--  mysql -u root -p uow_navigator < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS uow_navigator CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE uow_navigator;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(150) NOT NULL,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          ENUM('user','admin') DEFAULT 'user',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buildings table
CREATE TABLE IF NOT EXISTS buildings (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    name          VARCHAR(200) NOT NULL,
    code          VARCHAR(20),
    campus        ENUM('City Campus','Walsall Campus','Telford Campus') NOT NULL,
    category      ENUM('Academic','Library','Student Services','Catering','Sports','Accommodation','Administration') NOT NULL,
    description   TEXT,
    facilities    JSON,
    floor_count   TINYINT UNSIGNED,
    latitude      DECIMAL(10,7),
    longitude     DECIMAL(10,7),
    image_url     VARCHAR(500),
    opening_hours VARCHAR(200),
    accessibility JSON,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT NOT NULL,
    building_id INT NOT NULL,
    note        VARCHAR(500),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_fav (user_id, building_id),
    FOREIGN KEY (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
    FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE
);

-- ============================================================
--  Sample Data — University of Wolverhampton buildings
-- ============================================================

INSERT INTO buildings (name, code, campus, category, description, facilities, floor_count, latitude, longitude, image_url, opening_hours, accessibility) VALUES

('Harrison Learning Centre', 'HLC', 'City Campus', 'Library',
 'The main library and learning centre with extensive study spaces and digital resources.',
 '["PC Suites","Group Study Rooms","Printing","24hr Access","Silent Zone","Café"]',
 5, 52.58820, -2.12780,
 'https://images.unsplash.com/photo-1568667256549-094345857637?w=600',
 'Mon–Fri 8am–11pm, Sat–Sun 10am–6pm',
 '["Wheelchair Access","Lift","Accessible Toilets","Hearing Loop"]'),

('Alan Turing Building', 'AT', 'City Campus', 'Academic',
 'Home to Computer Science, Mathematics and Engineering departments.',
 '["Computer Labs","Lecture Theatres","Seminar Rooms","Staff Offices"]',
 4, 52.58795, -2.12700,
 'https://images.unsplash.com/photo-1562774053-701939374585?w=600',
 'Mon–Fri 8am–9pm',
 '["Wheelchair Access","Lift","Accessible Toilets"]'),

('Student Union Building', 'SU', 'City Campus', 'Student Services',
 'Hub for student activities, societies, welfare support and entertainment.',
 '["Bar","Cafeteria","Meeting Rooms","Student Support","Society Offices"]',
 2, 52.58850, -2.12760,
 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600',
 'Mon–Sat 9am–11pm, Sun 11am–8pm',
 '["Wheelchair Access","Accessible Toilets"]'),

('Millennium City Building', 'MC', 'City Campus', 'Academic',
 'Modern building hosting the Business School and social science departments.',
 '["Lecture Theatres","Seminar Rooms","Computer Labs","Common Room"]',
 5, 52.58800, -2.12650,
 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600',
 'Mon–Fri 8am–8pm',
 '["Wheelchair Access","Lift","Hearing Loop"]'),

('Sports Centre', 'SC', 'City Campus', 'Sports',
 'Full-service sports facility with gym, courts and swimming pool.',
 '["Gym","Swimming Pool","Sports Hall","Squash Courts","Changing Rooms"]',
 2, 52.58760, -2.12900,
 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
 'Mon–Fri 6:30am–10pm, Sat–Sun 8am–8pm',
 '["Wheelchair Access","Accessible Changing","Lift"]'),

('Walsall Campus Library', 'WL', 'Walsall Campus', 'Library',
 'Walsall campus library with study spaces, PCs and media resources.',
 '["PCs","Study Pods","Printing","Group Rooms"]',
 3, 52.58540, -1.98230,
 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600',
 'Mon–Fri 8:30am–8pm, Sat 10am–4pm',
 '["Wheelchair Access","Lift","Accessible Toilets"]'),

('Walsall Art & Design School', 'WA', 'Walsall Campus', 'Academic',
 'Creative and design faculty with studios, workshops and gallery space.',
 '["Art Studios","Design Labs","Gallery","Print Room","Darkroom"]',
 3, 52.58570, -1.98270,
 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
 'Mon–Fri 8am–7pm',
 '["Wheelchair Access"]'),

('Telford Innovation Centre', 'TI', 'Telford Campus', 'Academic',
 'Engineering and technology hub with industry-standard labs and maker spaces.',
 '["Engineering Labs","3D Printing","CNC Workshop","Lecture Rooms","Café"]',
 3, 52.68070, -2.44960,
 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600',
 'Mon–Fri 8am–8pm',
 '["Wheelchair Access","Lift","Accessible Parking"]');
