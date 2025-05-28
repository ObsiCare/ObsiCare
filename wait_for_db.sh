#!/bin/sh

echo "Menunggu PostgreSQL agar siap..."

while ! nc -z db 5432; do
  sleep 1
done

echo "PostgreSQL sudah siap. Menjalankan server..."

exec "$@"
