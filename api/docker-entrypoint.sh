#!/bin/sh
set -e

# Check if DB_RESET environment variable is set to "true"
if [ "$DB_RESET" = "true" ]; then
  echo "Resetting database with consolidated schema..."
  npm run db:reset
else
  echo "Running database migrations..."
  npm run migration:run
fi

echo "Starting application..."
exec node dist/main.js 