
// ============================================
// # Bees & Bears Frontend
// ============================================

**Created:** 14-12-2025  
**Updated:** 14-12-2025

A full-stack application for solar panel installers to create customers and generate loan offers with calculated monthly payments.
This README.md file was AI generated. 

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Docker Setup](#docker-setup)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

## Overview

This application allows solar panel installers (partners) to:
- Create and manage customers
- Generate loan offers for customers
- View calculated monthly payments in real-time
- Manage all operations through a simple web interface

## Tech Stack

### Backend
- **Framework:** Django 6.0
- **API:** Django REST Framework
- **Database:** SQLite (development) / PostgreSQL (production ready)
- **Language:** Python 3.13

### Frontend
- **Framework:** Next.js 16
- **Language:** JavaScript (React)
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS

### Infrastructure
- **Containerization:** Docker & Docker Compose
- **Orchestration:** Docker Compose

## Project Structure

```
899b36eb611defd0a31b6cfdae65b11e/
├── backend/                 # Django backend
│   ├── app/                # Django project settings
│   │   ├── settings.py     # Django configuration
│   │   └── urls.py         # URL routing
│   ├── customers/          # Customer app
│   │   ├── models.py       # Customer model
│   │   ├── views.py        # Customer ViewSet
│   │   └── serializers.py  # Customer serializer
│   ├── loans/              # Loan app
│   │   ├── models.py       # Loan model
│   │   ├── views.py        # Loan ViewSet
│   │   └── serializers.py  # Loan serializer
│   ├── partners/           # Partner app
│   │   ├── models.py       # Partner model
│   │   ├── views.py        # Partner ViewSet
│   │   └── serializers.py  # Partner serializer
│   ├── manage.py           # Django management script
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile           # Backend Docker config
├── frontend/               # Next.js frontend
│   ├── app/                # Next.js app directory
│   │   ├── layout.jsx      # Root layout
│   │   └── page.jsx        # Main page
│   ├── components/         # React components
│   │   ├── Message.jsx
│   │   ├── PartnerSelector.jsx
│   │   ├── CustomerForm.jsx
│   │   ├── LoanForm.jsx
│   │   └── CustomerList.jsx
│   ├── lib/
│   │   └── api.js          # API client (Axios)
│   ├── package.json        # Node dependencies
│   └── Dockerfile          # Frontend Docker config
├── docker-compose.yml      # Docker orchestration
└── README.md              # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.13+** (for local backend development)
- **Node.js 20+** (for local frontend development)
- **Docker** and **Docker Compose** (for containerized deployment)
- **Git** (for version control)

## Backend Setup

### Option 1: Local Development (Without Docker)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run database migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser (optional, for admin access):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the development server:**
   ```bash
   python manage.py runserver
   ```

   The backend will be available at: `http://localhost:8000`
   - API Root: `http://localhost:8000/api/`
   - Admin Panel: `http://localhost:8000/admin/`

### Option 2: Using Docker (Recommended)

See [Docker Setup](#docker-setup) section below.

## Frontend Setup
    
### Option 1: Local Development (Without Docker)

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at: `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

### Option 2: Using Docker (Recommended)

See [Docker Setup](#docker-setup) section below.

## Docker Setup

### Quick Start with Docker Compose

This is the easiest way to run the entire application:

1. **Navigate to project root:**
   ```bash
   cd 899b36eb611defd0a31b6cfdae65b11e
   ```

2. **Build and start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Run in detached mode (background):**
   ```bash
   docker-compose up -d --build
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f
   ```

5. **Stop all services:**
   ```bash
   docker-compose down
   ```

6. **Stop and remove volumes (clears database):**
   ```bash
   docker-compose down -v
   ```

### Services

After starting Docker Compose, the following services will be available:

- **Backend API:** `http://localhost:8000`
  - API Root: `http://localhost:8000/api/`
  - Admin Panel: `http://localhost:8000/admin/`

- **Frontend:** `http://localhost:3000`

### Docker Commands Reference

```bash
# Build and start services
docker-compose up --build

# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f
docker-compose logs backend    # Backend logs only
docker-compose logs frontend   # Frontend logs only

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes (clears data)
docker-compose down -v

# Rebuild a specific service
docker-compose build backend
docker-compose up -d backend

# Execute commands in containers
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
docker-compose exec backend python manage.py shell
```

### Environment Variables

#### Backend
Create a `.env` file in the `backend/` directory (optional):
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
```

#### Frontend
The frontend uses `NEXT_PUBLIC_API_URL` environment variable (set in docker-compose.yml):
- Default: `http://localhost:8000/api`
- Can be overridden in `docker-compose.yml`

## API Endpoints

### Partner Endpoints
- `GET /api/partners/` - List all partners
- `POST /api/partners/` - Create a new partner
- `GET /api/partners/{id}/` - Get specific partner
- `GET /api/partners/{id}/customers/` - Get customers for a partner
- `POST /api/partners/{id}/customers/` - Create customer for a partner

### Customer Endpoints
- `GET /api/customers/` - List all customers
- `POST /api/customers/` - Create a new customer
- `GET /api/customers/{id}/` - Get specific customer
- `GET /api/customers/{id}/loanoffers/` - Get loan offers for a customer

### Loan Offer Endpoints
- `GET /api/loanoffers/` - List all loan offers
- `POST /api/loanoffers/` - Create a new loan offer
  - **Body:** `{ customer, loan_amount, interest_rate, term_months }`
  - **Response:** Includes calculated `monthly_payments`
- `GET /api/loanoffers/{id}/` - Get specific loan offer

## Usage Guide

### 1. Start the Application

**Using Docker (Recommended):**
```bash
docker-compose up --build
```

**Or manually:**
```bash
# Terminal 1 - Backend
cd backend
python manage.py runserver

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 2. Access the Application

- Open your browser and navigate to: `http://localhost:3000`

### 3. Using the Application

1. **Select a Partner:**
   - Use the dropdown to select which partner you're acting on behalf of
   - If no partners exist, create one via the API or admin panel

2. **Create a Customer:**
   - Fill in the customer form with:
     - First Name, Last Name, Email (required)
     - Monthly Income, Credit Score (required)
     - Phone Number, Address (optional)
   - Click "Create Customer"

3. **Create a Loan Offer:**
   - Select a customer from the dropdown
   - Enter:
     - Loan Amount ($)
     - Interest Rate (%)
     - Term (Months)
   - Click "Create Loan Offer"
   - The monthly payment will be calculated and displayed

4. **View Customers:**
   - The customer list automatically updates when you create customers
   - Shows customer name, email, and credit score

## Development

### Backend Development

**Run migrations after model changes:**
```bash
python manage.py makemigrations
python manage.py migrate
```

**Access Django shell:**
```bash
python manage.py shell
```

**Run tests:**
```bash
python manage.py test
```

**Create superuser:**
```bash
python manage.py createsuperuser
```

### Frontend Development

**Component Structure:**
- All components are in `frontend/components/`
- Each component is self-contained
- API calls are centralized in `frontend/lib/api.js`

**Adding a New Component:**
1. Create file in `components/` directory
2. Export as default function
3. Import and use in `app/page.jsx`

**API Functions:**
All API functions are in `lib/api.js` and use Axios. To add a new API call:
1. Add function to `lib/api.js`
2. Use `apiClient` for consistent configuration
3. Handle errors appropriately

### Database

**Current Setup:**
- Development: SQLite (`db.sqlite3`)
- Production Ready: PostgreSQL (configured in requirements.txt)

**To switch to PostgreSQL:**
1. Update `backend/app/settings.py` DATABASES configuration
2. Set environment variables for database credentials
3. Run migrations: `python manage.py migrate`

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Find process using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill the process or use a different port
python manage.py runserver 8001
```

**Migration errors:**
```bash
# Reset migrations (WARNING: Deletes data)
python manage.py migrate --run-syncdb
```

**Module not found errors:**
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

### Frontend Issues

**Port 3000 already in use:**
```bash
# Use a different port
npm run dev -- -p 3001
```

**API connection errors:**
- Verify backend is running on `http://localhost:8000`
- Check CORS settings in `backend/app/settings.py`
- Verify `NEXT_PUBLIC_API_URL` environment variable

**Build errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Docker Issues

**Containers won't start:**
```bash
# Check logs
docker-compose logs

# Rebuild from scratch
docker-compose down -v
docker-compose up --build
```

**Port conflicts:**
- Change ports in `docker-compose.yml` if 8000 or 3000 are taken
- Update `NEXT_PUBLIC_API_URL` if backend port changes

**Database issues:**
```bash
# Reset database
docker-compose down -v
docker-compose up --build
```

**View container status:**
```bash
docker-compose ps
```

## API Testing

### Using curl

**Get all partners:**
```bash
curl http://localhost:8000/api/partners/
```

**Create a customer:**
```bash
curl -X POST http://localhost:8000/api/customers/ \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "income": "5000.00",
    "credit_score": 750
  }'
```

**Create a loan offer:**
```bash
curl -X POST http://localhost:8000/api/loanoffers/ \
  -H "Content-Type: application/json" \
  -d '{
    "customer": 1,
    "loan_amount": "10000.00",
    "interest_rate": "5.5",
    "term_months": 24
  }'
```

### Using the Browsable API

When `DEBUG=True`, visit `http://localhost:8000/api/` for an interactive API browser.

## Production Deployment

### Important Considerations

1. **Security:**
   - Set `DEBUG=False` in production
   - Use environment variables for `SECRET_KEY`
   - Update `ALLOWED_HOSTS` in `settings.py`
   - Configure proper CORS origins

2. **Database:**
   - Use PostgreSQL in production
   - Set up proper database backups
   - Use connection pooling

3. **Static Files:**
   - Configure static file serving (nginx, etc.)
   - Run `python manage.py collectstatic`

4. **Environment Variables:**
   - Never commit `.env` files
   - Use Docker secrets or environment management

5. **Docker:**
   - Use production-optimized images
   - Set up reverse proxy (nginx)
   - Configure SSL/TLS certificates

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check Django/Next.js documentation

## License

This project is part of a coding challenge for Bees & Bears.

---

**Last Updated:** 2025-01-27
