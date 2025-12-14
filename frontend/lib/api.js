import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api';

// get all partners
export async function fetchPartners() {
  const response = await axios.get(`${API_BASE_URL}/partners/`);
  if (response.status !== 200) {
    throw new Error('Failed to fetch partners');
  }
  return response.data; 
}

// get customers for a partner
export async function fetchPartnerCustomers(partnerId) {
  const response = await axios.get(`${API_BASE_URL}/partners/${partnerId}/customers/`);
  console.log(response.data);
  if (response.status !== 200) {
    throw new Error('Failed to fetch customers');
  }
  return response.data;
}

// Create customer for a partner
export async function createCustomerForPartner(partnerId, customerData) {
  const response = await fetch(`${API_BASE_URL}/partners/${partnerId}/customers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create customer');
  }
  return response.json();
}

// Create loan offer for a customer
export async function createLoanOffer(loanData) {
  const response = await fetch(`${API_BASE_URL}/loanoffers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loanData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create loan offer');
  }
  return response.json();
}
