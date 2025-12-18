import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8000/api";

// get all partners
export async function fetchPartners() {
  const response = await axios.get(`${API_BASE_URL}/partners/`);
  if (response.status !== 200) {
    throw new Error('Failed to fetch partners');
  }
  return response.data || []; 
}

// get customers for a partner
export async function fetchPartnerCustomers(partnerId) {
  const response = await axios.get(`${API_BASE_URL}/partners/${partnerId}/customers/`);
 
  if (response.status !== 200) {
    throw new Error('Failed to fetch customers');
  }
  return response.data || [];
}

// Create customer for a partner
export async function createCustomerForPartner(partnerId, customerData) {
  const response = await axios.post(`${API_BASE_URL}/partners/${partnerId}/customers/`,
    customerData
  );
  console.log("fetch response.data............", response.data);
  if (response.status !== 201) {
    throw new Error('Failed to create customer');
  }
  return response.data || [];
}

// Create loan offer for a customer
export async function createLoanOffer(customerId,loanData) {
  const response = await axios.post(`${API_BASE_URL}/customers/${customerId}/loanoffers/`, {
    loanData
  });
  console.log("create loan offer response............", response);
  if (response.status !== 201) {
    throw new Error('Failed to create loan offer');
  }
  return response.data.loanData;
}

// get all loan offers for a customer
export async function fetchCustomerLoanOffers(customerId) {
  const response = await axios.get(`${API_BASE_URL}/customers/${customerId}/loanoffers/`);
  if (response.status !== 200) {
    throw new Error('Failed to fetch loan offers');
  }
  return response.data||[];
}

