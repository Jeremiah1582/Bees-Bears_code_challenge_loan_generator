from django.db import models
# Create your models 

class Customer(models.Model):
    first_name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    email = models.EmailField(unique=True)
    income=models.DecimalField(max_digits=10,decimal_places=2)# monthly Income
    credit_score = models.PositiveIntegerField()
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
   #try using ManyToManyField(Loan)

    class Meta:
        ordering = ['-created_at']
        db_table = 'customer_table'  # Custom table name
        verbose_name = 'Customer'  # Human-readable name
        unique_together = ('first_name','last_name','address')  # Unique constraint
        indexes = [
            models.Index(fields=['email',"created_at"]),
        ]

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.email}"
    

    @property
    def annual_income(self):
        """Return annual income based on monthly income."""
        return self.income * 12

  
    @property
    def full_name(self): 
        return f"{self.first_name} {self.last_name}"

    @property
    def max_loan_amount(self):
        """Return maximum loan amount (50% of annual income)."""
        return self.annual_income / 2
    

    



    

