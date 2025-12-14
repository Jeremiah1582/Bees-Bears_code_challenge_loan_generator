'use client';

import { useState, useEffect } from 'react';
import { fetchPartners, fetchPartnerCustomers, createCustomerForPartner, createLoanOffer } from '../lib/api';

export default function Home() {
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Customer form state
  const [customerForm, setCustomerForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    income: '',
    credit_score: '',
    phone_number: '',
    address: '',
  });

  // Loan form state
  const [loanForm, setLoanForm] = useState({
    customer: '',
    loan_amount: '',
    interest_rate: '',
    term_months: '',
  });

  // Fetch partners on mount
  useEffect(() => {
    loadPartners();
  }, []);

  // Fetch customers when partner is selected
  useEffect(() => {
    if (selectedPartner) {
      loadCustomers();
    } else {
      setCustomers([]);
    }
  }, [selectedPartner]);

  const loadPartners = async () => {
    try {
      setLoading(true);
      const data = await fetchPartners();
      setPartners(data);
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await fetchPartnerCustomers(selectedPartner);
      setCustomers(data);
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    if (!selectedPartner) {
      showMessage('error', 'Please select a partner first');
      return;
    }

    try {
      setLoading(true);
      const customerData = {
        ...customerForm,
        income: parseFloat(customerForm.income),
        credit_score: parseInt(customerForm.credit_score),
      };
      await createCustomerForPartner(selectedPartner, customerData);
      showMessage('success', 'Customer created successfully!');
      setCustomerForm({
        first_name: '',
        last_name: '',
        email: '',
        income: '',
        credit_score: '',
        phone_number: '',
        address: '',
      });
      loadCustomers();
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLoan = async (e) => {
    e.preventDefault();
    if (!loanForm.customer) {
      showMessage('error', 'Please select a customer');
      return;
    }

    try {
      setLoading(true);
      const loanData = {
        customer: parseInt(loanForm.customer),
        loan_amount: parseFloat(loanForm.loan_amount),
        interest_rate: parseFloat(loanForm.interest_rate),
        term_months: parseInt(loanForm.term_months),
      };
      const result = await createLoanOffer(loanData);
      showMessage('success', `Loan offer created! Monthly payment: $${result.monthly_payments}`);
      setLoanForm({
        customer: '',
        loan_amount: '',
        interest_rate: '',
        term_months: '',
      });
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Bees & Bears - Loan Management</h1>

        {/* Message Display */}
        {message.text && (
          <div className={`mb-4 p-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* Partner Selection */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Partner</h2>
          <select
            value={selectedPartner}
            onChange={(e) => setSelectedPartner(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">-- Select a Partner --</option>
            {partners.map((partner) => (
              <option key={partner.id} value={partner.id}>
                {partner.company_name} - {partner.address}
              </option>
            ))}
          </select>
        </div>

        {/* Create Customer Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create Customer</h2>
          <form onSubmit={handleCreateCustomer} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={customerForm.first_name}
                  onChange={(e) => setCustomerForm({ ...customerForm, first_name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={customerForm.last_name}
                  onChange={(e) => setCustomerForm({ ...customerForm, last_name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={customerForm.email}
                onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={customerForm.income}
                  onChange={(e) => setCustomerForm({ ...customerForm, income: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score *</label>
                <input
                  type="number"
                  min="300"
                  max="850"
                  required
                  value={customerForm.credit_score}
                  onChange={(e) => setCustomerForm({ ...customerForm, credit_score: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={customerForm.phone_number}
                onChange={(e) => setCustomerForm({ ...customerForm, phone_number: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={customerForm.address}
                onChange={(e) => setCustomerForm({ ...customerForm, address: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !selectedPartner}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Customer'}
            </button>
          </form>
        </div>

        {/* Create Loan Offer Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create Loan Offer</h2>
          <form onSubmit={handleCreateLoan} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer *</label>
              <select
                value={loanForm.customer}
                onChange={(e) => setLoanForm({ ...loanForm, customer: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={!selectedPartner || customers.length === 0}
              >
                <option value="">-- Select a Customer --</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.full_name} ({customer.email})
                  </option>
                ))}
              </select>
              {selectedPartner && customers.length === 0 && (
                <p className="text-sm text-gray-500 mt-1">No customers found. Create a customer first.</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={loanForm.loan_amount}
                  onChange={(e) => setLoanForm({ ...loanForm, loan_amount: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  required
                  value={loanForm.interest_rate}
                  onChange={(e) => setLoanForm({ ...loanForm, interest_rate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Term (Months) *</label>
              <input
                type="number"
                min="1"
                max="600"
                required
                value={loanForm.term_months}
                onChange={(e) => setLoanForm({ ...loanForm, term_months: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !loanForm.customer}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Loan Offer'}
            </button>
          </form>
        </div>

        {/* Customers List */}
        {selectedPartner && customers.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Partner's Customers</h2>
            <div className="space-y-2">
              {customers.map((customer) => (
                <div key={customer.id} className="p-3 border border-gray-200 rounded">
                  <p className="font-medium">{customer.full_name}</p>
                  <p className="text-sm text-gray-600">{customer.email}</p>
                  <p className="text-sm text-gray-500">Credit Score: {customer.credit_score}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
