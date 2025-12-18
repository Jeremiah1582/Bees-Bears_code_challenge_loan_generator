/**Form for creating a new loan offer */
export default function LoanForm({ loanForm, setLoanForm, customers, selectedPartner, onSubmit, loading }) {
  const handleChange = (field, value) => {
    setLoanForm({ ...loanForm, [field]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Create Loan Offer</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Customer *</label>
          <select
            value={loanForm.customer}
            onChange={(e) => handleChange('customer', e.target.value)}
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
              onChange={(e) => handleChange('loan_amount', e.target.value)}
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
              value={loanForm.annual_rate}
              onChange={(e) => handleChange('annual_rate', e.target.value)}
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
            onChange={(e) => handleChange('term_months', e.target.value)}
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
  );
}
