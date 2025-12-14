from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Loan
from .serializers import LoanSerializer
from customers.models import Customer
from django.shortcuts import get_object_or_404


class LoanOfferViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing loan offers.
    Provides standard CRUD operations.
    Endpoint: POST /loanoffers
    """
    serializer_class = LoanSerializer
    queryset = Loan.objects.all() # get all loans

    def create(self, request, *args, **kwargs):
        """
        Create a new loan offer.
        Endpoint: POST /loanoffers
        Expected data: customer_id (or customer), loan_amount, interest_rate (or annual_rate), term_months
        """
        data = request.data.copy()
        
        # Handle 'interest_rate' as alias for 'annual_rate'
        if 'interest_rate' in data and 'annual_rate' not in data:
            data['annual_rate'] = data.pop('interest_rate')
        
        # Handle 'customer_id' as alias for 'customer'
        if 'customer_id' in data and 'customer' not in data:
            data['customer'] = data.pop('customer_id')
        
        # Set default annual_rate if not provided
        if 'annual_rate' not in data:
            data['annual_rate'] = 20  # Default 20%
        
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            loan = serializer.save()
            return Response(
                LoanSerializer(loan).data, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
