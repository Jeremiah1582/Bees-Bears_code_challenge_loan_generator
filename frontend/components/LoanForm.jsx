import { useState } from 'react';

export default function LoanForm({ customers, onCreateSuccess, loading }) {
  const [formData, setFormData] = useState({
    customer: '',
    loan_amount: '',
    interest_rate: '',
    term_months: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customer) newErrors.customer = 'Please select a customer';
    if (!formData.loan_amount || parseFloat(formData.loan_amount) <= 0) {
      newErrors.loan_amount = 'Valid loan amount is required';
    }
    if (!formData.interest_rate || parseFloat(formData.interest_rate) < 0 || parseFloat(formData.interest_rate) > 100) {
      newErrors.interest_rate = 'Interest rate must be between 0 and 100';
    }
    if (!formData.term_months || parseInt(formData.term_months) < 1 || parseInt(formData.term_months) > 600) {
      newErrors.term_months = 'Term must be between 1 and 600 months';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const loanData = {
        customer: parseInt(formData.customer),
        loan_amount: parseFloat(formData.loan_amount),
        interest_rate: parseFloat(formData.interest_rate),
        term_months: parseInt(formData.term_months),
      };

      const result = await onCreateSuccess(loanData);
      
      // Reset form on success
      setFormData({
        customer: '',
        loan_amount: '',
        interest_rate: '',
        term_months: '',
      });
      setErrors({});
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Create Loan Offer</h2>
      
      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer *
          </label>
          <select
            value={formData.customer}
            onChange={(e) => handleChange('customer', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customer ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={customers.length === 0}
          >
            <option value="">-- Select a Customer --</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.full_name} ({customer.email})
              </option>
            ))}
          </select>
          {errors.customer && (
            <p className="text-sm text-red-500 mt-1">{errors.customer}</p>
          )}
          {customers.length === 0 && (
            <p className="text-sm text-gray-500 mt-1">No customers available. Create a customer first.</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount ($) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.loan_amount}
              onChange={(e) => handleChange('loan_amount', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.loan_amount ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.loan_amount && (
              <p className="text-sm text-red-500 mt-1">{errors.loan_amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate (%) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={formData.interest_rate}
              onChange={(e) => handleChange('interest_rate', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.interest_rate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.interest_rate && (
              <p className="text-sm text-red-500 mt-1">{errors.interest_rate}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Term (Months) *
          </label>
          <input
            type="number"
            min="1"
            max="600"
            value={formData.term_months}
            onChange={(e) => handleChange('term_months', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.term_months ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.term_months && (
            <p className="text-sm text-red-500 mt-1">{errors.term_months}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !formData.customer || customers.length === 0}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Creating Loan Offer...' : 'Create Loan Offer'}
        </button>
      </form>
    </div>
  );
}
