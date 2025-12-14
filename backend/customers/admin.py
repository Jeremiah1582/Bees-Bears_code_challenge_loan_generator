from django.contrib import admin
from customers.models import Customer
from partners.models import Partner
from loans.models import Loan
# Register your models here.

admin.site.register(Customer)
admin.site.register(Partner)
admin.site.register(Loan)




