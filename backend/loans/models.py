from django.db import models, IntegrityError
from customers.models import Customer
from datetime import date



# Create your LoanOffer models here.




class Loan(models.Model): 
    customer=models.ForeignKey(Customer, on_delete=models.CASCADE, related_name="loans")
    loan_amount= models.DecimalField(max_digits=10, decimal_places=2, default=1000)
    annual_rate= models.DecimalField(max_digits=4, decimal_places=2, default=20)
    term_months= models.IntegerField(null=True, default=12) #total duration over which the loan must be repaid
    #monthly_payments= models.DecimalField(max_digits=10,decimal_places=2) #amount the borrower needs to pay back each month during the loan term
    issue_date= models.DateField(blank=True, null= True, default=date.today())
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        db_table = 'loan_table'  # Custom table name
        verbose_name = 'Loan'  # Human-readable name
        unique_together = ('customer','loan_amount','annual_rate','term_months')  # Unique constraint
        indexes = [
            models.Index(fields=['customer',"created_at"]),
        ]
        verbose_name_plural = 'Loans'
        
    def __str__(self): 
        return f"Loan {self.customer.id} {self.loan_amount}"

    # qualifying checks 
    
    def has_sufficient_income(self): 
        # is customers income x2 the loan amount? 
        try:
            qualify= (self.customer.calc_annual_income()>= self.loan_amount*2)
            return qualify
        except TypeError:
            print("there is a type error, please ensure input is valid,{TypeError}")
            return False
        
    # is customers creditscore good? 
    def has_good_credit(self): 
        try:
            badCreditScore= self.customer.credit_score >= 500
            return badCreditScore
        
        except (TypeError, AttributeError): 
            print(f"there was an error {TypeError, AttributeError}")
            return False
        
    def qualify_for_loan(self): 
        if self.hass_sufficient_income() and self.has_good_credit():
            return True
        else:
            return False 
        
        
    @property
    def monthly_payments(self):
        if self.qualify_for_loan():
            try:
                P = self.loan_amount
                r = self.annual_rate / 12 / 100
                n = self.term_months
                M = P * (r * (1 + r) ** n) / ((1 + r) ** n - 1)

                return M 
                
            
            except ZeroDivisionError:
                return ZeroDivisionError.Decimal('0.00')
        return None
    

        

        


        