export default function CustomerList({ customers, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Partner's Customers</h2>
        <p className="text-gray-500">Loading customers...</p>
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Partner's Customers</h2>
      <div className="space-y-3">
        {customers.map((customer) => (
          <div key={customer.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <p className="font-semibold text-gray-900">{customer.full_name}</p>
            <p className="text-sm text-gray-600 mt-1">{customer.email}</p>
            <div className="mt-2 flex gap-4 text-sm text-gray-500">
              <span>Credit Score: {customer.credit_score}</span>
              {customer.annual_income && (
                <span>Annual Income: ${parseFloat(customer.annual_income).toLocaleString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
