'use client';

import { useState, useEffect } from 'react';
import { fetchPartners, fetchPartnerCustomers, createCustomerForPartner, createLoanOffer } from '../lib/api';
import Message from '../components/Message';
import PartnerSelector from '../components/PartnerSelector';
import CustomerForm from '../components/CustomerForm';
import LoanForm from '../components/LoanForm';
import CustomerList from '../components/CustomerList';
import { fetchCustomerLoanOffers } from '../lib/api';

/**Home Page Component */
export default function Home() {
  // Application state
  const [partners, setPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState('');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  
  const [customerLoans, setCustomerLoans] = useState([])
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showLoanList, setShowLoanList] = useState(false)

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
    annual_rate: '',
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
      setCustomerLoans([]);
      setSelectedCustomer(null);
      setShowLoanList(false);
    }
  }, [selectedPartner]);

  //Reload loans when loan is added
  useEffect(()=>{
    console.log("loanForm useEffect is............",loanForm)

  },[loanForm])

  //Load all partners from the API
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

  /**Load customers for the selected partner*/
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

  /**
   * Handle customer form submission
   */
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

  /**
   * Handle loan form submission
   */
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
        annual_rate: parseFloat(loanForm.annual_rate),
        term_months: parseInt(loanForm.term_months),
      };
      const result = await createLoanOffer(loanData.customer, loanData);
      showMessage('success', `Loan offer created! Monthly payment: $${result}`);
      setLoanForm({
        customer: '',
        loan_amount: '',
        annual_rate: '',
        term_months: '',
      });
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

/**handle fetch customer loans*/
const handleShowLoanOffers= async (e,customer)=>{
  setLoading(true);
  setShowLoanList(!showLoanList)
  setSelectedCustomer(customer)
  try{
    const loanOffers= await fetchCustomerLoanOffers(customer.id)
    setCustomerLoans(loanOffers)
    showMessage('success', 'Loan offers fetched successfully!');
  } catch (error) {
    showMessage('error', error.message);
  } finally {
    setLoading(false);
  }
}

  /** Display a message to the user*/
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Bees & Bears - Loan Management</h1>

        {/* Message Display - Props: message */}
        <Message message={message} />

        {/* Partner Selection - Props: partners, selectedPartner, onPartnerChange, loading */}
        <PartnerSelector
          partners={partners}
          selectedPartner={selectedPartner}
          onPartnerChange={setSelectedPartner}
          loading={loading}
        />

        {/* Create Customer Form - Props: customerForm, setCustomerForm, selectedPartner, onSubmit, loading */}
        <CustomerForm
          customerForm={customerForm}
          setCustomerForm={setCustomerForm}
          selectedPartner={selectedPartner}
          onSubmit={handleCreateCustomer}
          loading={loading}
        />

        {/* Create Loan Offer Form - Props: loanForm, setLoanForm, customers, selectedPartner, onSubmit, loading */}
        <LoanForm
          loanForm={loanForm}
          setLoanForm={setLoanForm}
          customers={customers}
          selectedPartner={selectedPartner}
          onSubmit={handleCreateLoan}
          loading={loading}
        />

        {/* Customers List - Props: customers, selectedPartner, customerLoans, showLoanList, setShowLoanList, setSelectedCustomer, setCustomerLoans, selectedCustomer, handleShowLoanOffers */}
        <CustomerList
          customers={customers}
          selectedPartner={selectedPartner}
          customerLoans={customerLoans}
          showLoanList={showLoanList}
          setShowLoanList={setShowLoanList}
          setSelectedCustomer={setSelectedCustomer}
          setCustomerLoans={setCustomerLoans}
          selectedCustomer={selectedCustomer}
          handleShowLoanOffers={handleShowLoanOffers}
        />
      </div>
    </div>
  );
}
