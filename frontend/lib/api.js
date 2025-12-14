import axios from 'axios';

// Base URL for API - can be overridden with environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// PARTNER API FUNCTIONS
// ============================================

/**Get all partners */
export async function getPartners() {
  try {
    const response = await apiClient.get('/partners/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch partners');
  }
}

/** Get customers for a specific partner */
export async function getPartnerCustomers(partnerId) {
  try {
    const response = await apiClient.get(`/partners/${partnerId}/customers/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch customers');
  }
}

/**Create a customer for a partner */
export async function createPartnerCustomer(partnerId, customerData) {
  try {
    const response = await apiClient.post(`/partners/${partnerId}/customers/`, customerData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || 
                        Object.values(error.response?.data || {}).flat().join(', ') ||
                        'Failed to create customer';
    throw new Error(errorMessage);
  }
}

// ============================================
// CUSTOMER API FUNCTIONS
// ============================================

/**
 * Get all customers */
export async function getCustomers() {
  try {
    const response = await apiClient.get('/customers/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch customers');
  }
}

/**
 * Create a new customer
 * @param {Object} customerData - Customer data
 * @returns {Promise} Created customer object
 */
export async function createCustomer(customerData) {
  try {
    const response = await apiClient.post('/customers/', customerData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail || 
                        Object.values(error.response?.data || {}).flat().join(', ') ||
                        'Failed to create customer';
    throw new Error(errorMessage);
  }
}

/**
 * Get loan offers for a customer
 * @param {number} customerId - Customer ID
 * @returns {Promise} List of loan offers
 */
export async function getCustomerLoanOffers(customerId) {
  try {
    const response = await apiClient.get(`/customers/${customerId}/loanoffers/`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch loan offers');
  }
}

// ============================================
// LOAN OFFER API FUNCTIONS
// ============================================

/**
 * Get all loan offers
 * @returns {Promise} List of all loan offers
 */
export async function getLoanOffers() {
  try {
    const response = await apiClient.get('/loanoffers/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch loan offers');
  }
}

/**
  Create a new loan offer
  @param {Object} loanData - Loan offer data (customer, loan_amount, interest_rate, term_months)
  @returns {Promise} Created loanoffer object
 */
export async function createLoanOffer(loanData) {
  try {
    const response = await apiClient.post('/loanoffers/', loanData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.detail;
    throw new Error(errorMessage);
  }
}
