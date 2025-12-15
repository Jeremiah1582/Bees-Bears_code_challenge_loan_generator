# Use Python 3.13 slim image
# This is a small, secure base image.
FROM python:3.13-slim

# Set environment variables
# PYTHONDONTWRITEBYTECODE=1: Prevents creation of .pyc files (cleaner container).
# PYTHONUNBUFFERED=1: Ensures Python output is sent immediately to the terminal/logs.
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install minimal system dependencies
# Only install 'curl' (if needed for healthchecks/testing) and clean up apt cache.
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file (leverages Docker cache)
COPY requirements.txt /app/

# Install Python dependencies
# SQLite is built into Python, so no special libraries are needed here.
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy project files
# Ensure a .dockerignore file is present to exclude unnecessary files like .git, .env, etc.
COPY . /app/

# Create a dedicated directory for the SQLite database file
# This is CRITICAL when used with a volume mount in docker-compose.yml for persistence.
RUN mkdir -p /app/data

# Expose port (standard for Django dev server)
EXPOSE 8000

# Security: Set a non-root user (good practice even for development)
RUN adduser --disabled-password --no-create-home django-user
USER django-user

# Run migrations and start the Django development server
# The development server is suitable for local coding/debugging.
# python manage.py migrate --noinput: Runs migrations non-interactively.
# python manage.py runserver 0.0.0.0:8000: Starts the server accessible from outside the container.
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py runserver 0.0.0.0:8000"]