/**Displays a list of customers for the selected partner
 * customers - List of customer objects
 * selectedPartner - Currently selected partner ID
 */
import CustomerLoanList from './CustomerLoanList'

export default function CustomerList({ customers, selectedPartner, customerLoans, showLoanList, setShowLoanList, setSelectedCustomer, setCustomerLoans, selectedCustomer, handleShowLoanOffers}) {
    
  if (!selectedPartner || customers.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Partner's Customers</h2>
      <div className="space-y-2">
        {customers.map((customer) => (
          <div key={customer.id} onClick={(e)=>handleShowLoanOffers(e,customer)} className="p-3 border border-gray-200 rounded bg-blue-100" >
            <p className="font-medium">{customer.full_name}</p>
            <p className="text-sm text-gray-600">{customer.email}</p>
            <p className="text-sm text-gray-500">Credit Score: {customer.credit_score}</p>
            
            {showLoanList && selectedCustomer.id == customer.id && <CustomerLoanList customer={selectedCustomer} loans={customerLoans} />}
          </div>
        ))}
    
      </div>
    </div>
)}
