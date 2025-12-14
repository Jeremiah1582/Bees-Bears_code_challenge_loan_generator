import { useState } from 'react';

export default function CustomerForm({ selectedPartner, onCreateSuccess, loading }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    income: '',
    credit_score: '',
    phone_number: '',
    address: '',
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
    
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.income || parseFloat(formData.income) <= 0) newErrors.income = 'Valid income is required';
    if (!formData.credit_score || parseInt(formData.credit_score) < 300 || parseInt(formData.credit_score) > 850) {
      newErrors.credit_score = 'Credit score must be between 300 and 850';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedPartner) {
      setErrors({ general: 'Please select a partner first' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const customerData = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        income: parseFloat(formData.income),
        credit_score: parseInt(formData.credit_score),
        phone_number: formData.phone_number.trim() || null,
        address: formData.address.trim() || null,
      };

      await onCreateSuccess(customerData);
      
      // Reset form on success
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        income: '',
        credit_score: '',
        phone_number: '',
        address: '',
      });
      setErrors({});
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Create Customer</h2>
      
      {errors.general && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => handleChange('first_name', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.first_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.first_name && (
              <p className="text-sm text-red-500 mt-1">{errors.first_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => handleChange('last_name', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.last_name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.last_name && (
              <p className="text-sm text-red-500 mt-1">{errors.last_name}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Income ($) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.income}
              onChange={(e) => handleChange('income', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.income ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.income && (
              <p className="text-sm text-red-500 mt-1">{errors.income}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credit Score (300-850) *
            </label>
            <input
              type="number"
              min="300"
              max="850"
              value={formData.credit_score}
              onChange={(e) => handleChange('credit_score', e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.credit_score ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.credit_score && (
              <p className="text-sm text-red-500 mt-1">{errors.credit_score}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            value={formData.phone_number}
            onChange={(e) => handleChange('phone_number', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address (Optional)
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            rows="2"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !selectedPartner}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Creating Customer...' : 'Create Customer'}
        </button>
      </form>
    </div>
  );
}
