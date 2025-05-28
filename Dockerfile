# Gunakan Python base image
FROM python:3.10-slim

# Menentukan working directory di dalam container
WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd gcc && rm -rf /var/lib/apt/lists/*

# Menyalin file requirements.txt dan menginstal dependencies
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Salin seluruh kode proyek ke dalam container
COPY . .

COPY wait_for_db.sh /wait_for_db.sh
RUN chmod +x /wait_for_db.sh

# Expose port FastAPI (default 8000)
EXPOSE 8000

# Jalankan aplikasi menggunakan uvicorn
CMD ["/wait_for_db.sh", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
