const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const MAX_SIZE_MB = 500;
const DIRS_TO_CHECK = ['/root/.openclaw', '/app/data'];
const DB_PATH = '/app/data/investor_diary.sqlite';

function getDirSize(dirPath) {
    try {
        const output = execSync(`du -sm ${dirPath}`).toString();
        return parseInt(output.split('\t')[0]);
    } catch (e) {
        return 0;
    }
}

function cleanup() {
    console.log("Disk safety: Limit exceeded. Starting cleanup...");
    
    // 1. Очистка логов старше 7 дней
    try {
        execSync(`sqlite3 ${DB_PATH} "DELETE FROM action_logs WHERE timestamp < datetime('now', '-7 days');"`);
        console.log("Old action logs cleared.");
    } catch (e) {
        console.error("Failed to clear logs:", e.message);
    }

    // 2. Очистка Canvas (старые файлы)
    const canvasDir = '/root/.openclaw/canvas';
    if (fs.existsSync(canvasDir)) {
        try {
            execSync(`find ${canvasDir} -type f -mtime +7 -delete`);
            console.log("Old canvas files deleted.");
        } catch (e) {
            console.error("Failed to clear canvas:", e.message);
        }
    }
}

const totalSize = DIRS_TO_CHECK.reduce((acc, dir) => acc + getDirSize(dir), 0);
console.log(`Total data size: ${totalSize}MB / ${MAX_SIZE_MB}MB`);

if (totalSize > MAX_SIZE_MB) {
    cleanup();
}
