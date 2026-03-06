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