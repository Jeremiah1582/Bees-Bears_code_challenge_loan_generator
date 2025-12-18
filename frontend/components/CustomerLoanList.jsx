

export default function CustomerLoanList({customer,loans}){
    if (loans.length === 0) {
        return <p>No loans found</p>
    }
   
    return (
    <div>
        {loans && loans.map((loan)=>(
         
        <div key={loan.id} className="border-b border-gray-200 p-2 background-blue-100 p-8 rounded-lg shadow-md mb-4">--------------------------------
            <p className="text-sm text-gray-600">Customer name {customer.full_name}</p>
            <h3 className="text-lg font-semibold text-blue-600">Loan Amount: €{loan.loan_amount}</h3>
            <h4 className="text-lg font-semibold text-blue-600">monthly payments of: €{loan.monthly_payments}</h4>
            <p className="text-sm text-gray-600">Term Months: {loan.term_months}</p>
            <p className="text-sm text-gray-600">Interest Rate: {loan.annual_rate}%</p>
            <p className="text-sm text-gray-600">Issue Date: {loan.issue_date}</p>
          
            -----------------------------------------------
        </div>
       ))}  
    </div>
    )
}