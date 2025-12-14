'use client';

import { useState, useEffect } from 'react';
import { getPartners, getPartnerCustomers, createPartnerCustomer, createLoanOffer } from '../lib/api';
import PartnerSelector from '../components/PartnerSelector';
import CustomerForm from '../components/CustomerForm';
import LoanForm from '../components/LoanForm';
import CustomerList from '../components/CustomerList';
import Message from '../components/Message';

export default function Home() {
  // State management
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Load partners when component mounts
  useEffect(() => {
    loadPartners();
  }, []);

  // Load customers when partner is selected
  useEffect(() => {
    if (selectedPartner) {
      loadCustomers();
    } else {
      setCustomers([]);
    }
  }, [selectedPartner]);

  /**Load all partners from the API*/
  const loadPartners = async () => {
    try {
      setLoading(true);
      const data = await getPartners();
      setPartners(data);
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load customers for the selected partner
   */
  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await getPartnerCustomers(selectedPartner);
      setCustomers(data);
    } catch (error) {
      showMessage('error', error.message);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle customer creation
   */
  const handleCreateCustomer = async (customerData) => {
    try {
      setLoading(true);
      await createPartnerCustomer(selectedPartner, customerData);
      showMessage('success', 'Customer created successfully!');
      // Reload customers list
      await loadCustomers();
    } catch (error) {
      showMessage('error', error.message);
      throw error; // Re-throw so form can handle it
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle loan offer creation
   */
  const handleCreateLoan = async (loanData) => {
    try {
      setLoading(true);
      const result = await createLoanOffer(loanData);
      const monthlyPayment = parseFloat(result.monthly_payments).toFixed(2);
      showMessage('success', `Loan offer created successfully! Monthly payment: $${monthlyPayment}`);
    } catch (error) {
      showMessage('error', error.message);
      throw error; // Re-throw so form can handle it
    } finally {
      setLoading(false);
    }
  };

  /**
   * Display a message to the user
   */
  const showMessage = (type, text) => {
    setMessage({ type, text });
    // Auto-hide message after 5 seconds
    setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-40 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-3xl font-bold mb-8 text-white">
          Bees & Bears - Loan Management
        </h1>

        {/* Message Display */}
        <Message message={message} />

        {/* Partner Selection */}
        <PartnerSelector
          partners={partners}
          selectedPartner={selectedPartner}
          onPartnerChange={setSelectedPartner}
          loading={loading}
        />

        {/* Create Customer Form */}
        <CustomerForm
          selectedPartner={selectedPartner}
          onCreateSuccess={handleCreateCustomer}
          loading={loading}
        />

        {/* Create Loan Offer Form */}
        <LoanForm
          customers={customers}
          onCreateSuccess={handleCreateLoan}
          loading={loading}
        />

        {/* Customer List */}
        <CustomerList customers={customers} loading={loading} />
      </div>
    </div>
  );
}
