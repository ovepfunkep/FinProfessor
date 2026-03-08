const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dbPath = '/app/data/investor_diary.sqlite';

// Убедимся, что папка data существует
if (!fs.existsSync(path.dirname(dbPath))) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

const sql = `
-- Таблица текущего портфеля
CREATE TABLE IF NOT EXISTS portfolio (
    ticker TEXT PRIMARY KEY,
    quantity REAL NOT NULL,
    avg_price REAL NOT NULL
);

-- Таблица транзакций
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticker TEXT NOT NULL,
    price REAL NOT NULL,
    tax REAL NOT NULL,
    commission REAL NOT NULL,
    date TEXT NOT NULL,
    type TEXT NOT NULL
);

-- Память агента (состояние чтения и т.д.)
CREATE TABLE IF NOT EXISTS agent_memory (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

-- Динамические параметры (фильтры, настройки)
CREATE TABLE IF NOT EXISTS agent_parameters (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- Логи действий (мысли и аудит)
CREATE TABLE IF NOT EXISTS action_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    agent TEXT NOT NULL,
    action TEXT NOT NULL,
    details TEXT
);

-- Бэклог запросов на новые инструменты/навыки
CREATE TABLE IF NOT EXISTS agent_backlog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    agent_id TEXT NOT NULL,
    request_type TEXT NOT NULL,
    details TEXT NOT NULL,
    status TEXT DEFAULT 'pending' -- pending, approved, rejected, completed
);
`;

try {
    // Используем sqlite3 через execSync для надежности в контейнере
    execSync(`sqlite3 ${dbPath} "${sql}"`);
    console.log("Database and tables (v2) initialized successfully at " + dbPath);
    
    // Начальное наполнение фильтров, если их нет
    const initialFilters = JSON.stringify(["нефть", "ставка", "цб", "санкции", "сша", "китай", "рубль", "инфляция", "дивиденд", "отчет", "газ", "спг", "акции", "moex", "мосбиржа", "офз", "прибыль", "убыток", "экспорт", "импорт", "налог", "недвижимость", "золото", "фарма", "алюминий", "крипто"]);
    execSync(`sqlite3 ${dbPath} "INSERT OR IGNORE INTO agent_parameters (key, value) VALUES ('news_filters', '${initialFilters}');"`);
    console.log("Initial parameters seeded.");
} catch (error) {
    console.error("Error initializing database:", error.message);
}
