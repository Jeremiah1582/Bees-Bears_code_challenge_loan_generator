# Bees & Bears Frontend

**Created:** 2025-01-27  
**Updated:** 2025-01-27

## Project Structure

```
frontend/
├── app/
│   ├── layout.jsx          # Root layout (wraps all pages)
│   ├── page.jsx            # Main page (homepage)
│   └── globals.css         # Global styles
├── components/              # Reusable UI components
│   ├── Message.jsx         # Success/error message display
│   ├── PartnerSelector.jsx # Partner selection dropdown
│   ├── CustomerForm.jsx    # Customer creation form
│   ├── LoanForm.jsx        # Loan offer creation form
│   └── CustomerList.jsx    # Customer list display
├── lib/
│   └── api.js              # All API calls using Axios
└── Dockerfile              # Docker configuration
```

## How It Works

### 1. Main Page (`app/page.jsx`)
- This is the main entry point
- Manages all state (partners, customers, loading, messages)
- Orchestrates all components
- Handles all API calls through functions in `lib/api.js`

### 2. API Functions (`lib/api.js`)
- All API calls are centralized here
- Uses Axios for HTTP requests
- Each function is well-documented
- Functions match backend endpoints exactly

### 3. Components (`components/`)
Each component is self-contained:
- **Message.jsx**: Shows success/error messages
- **PartnerSelector.jsx**: Dropdown to select partner
- **CustomerForm.jsx**: Form to create customers (manages its own form state)
- **LoanForm.jsx**: Form to create loan offers (manages its own form state)
- **CustomerList.jsx**: Displays list of customers

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## API Configuration

The API base URL is set in `lib/api.js`:
- Default: `http://localhost:8000/api`
- Can be overridden with `NEXT_PUBLIC_API_URL` environment variable

## Component Usage

### Adding a New Component
1. Create file in `components/` directory
2. Export as default function
3. Import and use in `app/page.jsx`

### Example Component Structure
```javascript
export default function MyComponent({ prop1, prop2 }) {
  return (
    <div className="...">
      {/* Component JSX */}
    </div>
  );
}
```

## API Functions Reference

All API functions are in `lib/api.js`:

- `getPartners()` - Get all partners
- `getPartnerCustomers(partnerId)` - Get customers for a partner
- `createPartnerCustomer(partnerId, customerData)` - Create customer for partner
- `getCustomers()` - Get all customers
- `createCustomer(customerData)` - Create a customer
- `getCustomerLoanOffers(customerId)` - Get loan offers for customer
- `getLoanOffers()` - Get all loan offers
- `createLoanOffer(loanData)` - Create a loan offer

## Styling

This project uses Tailwind CSS for styling. Classes are applied directly to elements.

## Docker

To build and run with Docker:
```bash
docker build -t beesnbears-frontend .
docker run -p 3000:3000 beesnbears-frontend
```

Or use docker-compose from the root directory.
