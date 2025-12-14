from django.db import models, IntegrityError  
from customers.models import Customer
from loans.models import Loan

# Create your models here.

class Partner(models.Model):
    company_name = models.CharField(max_length=100)
    address =models.TextField()
    created_at= models.DateTimeField(auto_now_add=True)
    customers = models.ManyToManyField(Customer, related_name="partners", blank=True)
    #updated_at= models.DateTimeField(auto_now=True)

 
    class Meta:
        ordering = ['-created_at'] # Default ordering by last name
        db_table = 'partner_table'  # Custom table name
        verbose_name = 'Partner'  # Human-readable name
        unique_together = ('company_name','address')  # Unique constraint
        indexes = [
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return f"{self.company_name} {self.address}"
    
    def create_new_customer(self, **kwargs): 
        """Create a new customer and associate it with this partner."""
        try:
            newCustomer = Customer.objects.create(**kwargs)
            # Add to ManyToMany relationship
            self.customers.add(newCustomer)
            return newCustomer
        
        except IntegrityError as e:
            return f"there was an issue saving the data to the database: --{e}"
        
        except Exception as e: 
            return f"there was an error {e}"

    #create select_loan_issue_date() function 

    def create_customer_loan(self, customer_instance, loan_amount=None, annual_rate=20, term_months=12): 
        """ 
        Create a loan for a customer.
        If loan_amount is not provided, uses customer's max_loan_amount.
        """
        if loan_amount is None:
            loan_amount = customer_instance.max_loan_amount
        
        if not loan_amount > 100:
            return f"customer does not qualify for a loan"
        try:
            loan = Loan.objects.create(
                customer=customer_instance,
                loan_amount=loan_amount,
                annual_rate=annual_rate, 
                term_months=term_months,
            )
            return loan
        except IntegrityError as e:
            raise IntegrityError(f"there was an issue creating a customer loan {e}")
        except Exception as e:
            raise Exception(f"there was an error creating a customer loan {e}")

 
""" def get_all_customers(self):

        try:
#            Super Efficient
#            Retrieves all Customer objects related to this Partner instance (self).
#            This uses the 'related_name' defined on the Customer model's ForeignKey.
#            Customer Model attribute – partner = models.ForeignKey(Partners, on_delete=models.PROTECT, related_name="customers")
#            return Customer.object.all()
            
            return self.customers.all()
            
        
        except ValueError:

            return f"there was a value error --{ValueError}"

        except Exception as e: 
            return f"there was an error {e}"
"""

            

    
  
