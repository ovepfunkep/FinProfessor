#!/bin/bash
set -e

echo "Running OpenClaw configuration setup..."

# Убедимся, что конфигурация OpenClaw существует и прописана как local
openclaw config set gateway.mode local

# Разрешим fallback для Host header (CORS фикс для Web UI в Docker)
openclaw config set gateway.controlUi.dangerouslyAllowHostHeaderOriginFallback true

# Починим warning от Telegram
openclaw config set channels.telegram.groupPolicy open

# Авто-исправление остальных мелких проблем конфигурации (если есть)
openclaw doctor --fix

echo "Setup complete. Starting OpenClaw Gateway..."
# Передаем управление основной команде (CMD из Dockerfile)
exec "$@"
