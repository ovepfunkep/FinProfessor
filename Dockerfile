# Базовый образ для OpenClaw (требуется Node.js >= 22)
FROM node:22-slim

WORKDIR /app

# Устанавливаем необходимые системные зависимости (включая git для npm и dos2unix для фикса скриптов)
RUN apt-get update && apt-get install -y \
    sqlite3 \
    python3 \
    python3-pip \
    git \
    dos2unix \
    chromium \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем OpenClaw CLI глобально через npm
RUN npm install -g openclaw

# Копируем файлы проекта
COPY . /app/

# Важный шаг: копируем entrypoint-скрипт ВНЕ папки /app, чтобы он не затерся при монтировании volume из Windows!
COPY docker-entrypoint.sh /usr/local/bin/

# Конвертируем переносы строк в формате Windows (CRLF) в Linux (LF) и делаем скрипт исполняемым
RUN dos2unix /usr/local/bin/docker-entrypoint.sh && chmod +x /usr/local/bin/docker-entrypoint.sh

# Открываем порт для OpenClaw Gateway (по умолчанию 18789)
EXPOSE 18789

# Устанавливаем скрипт инициализации как точку входа
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# Запускаем агента (шлюз)
CMD ["openclaw", "gateway", "run", "--bind", "lan"]