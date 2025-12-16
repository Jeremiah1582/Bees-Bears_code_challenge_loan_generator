from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Customer
from .serializers import CustomerSerializer
from loans.models import Loan
from loans.serializers import LoanSerializer
from django.shortcuts import get_object_or_404


class CustomerViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing customers.
    Provides standard CRUD operations.
    """
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()

    @action(detail=True, methods=['get', 'post'], url_path='loanoffers')
    def get_loan_offers(self, request, pk=None):
        """
        Get all loan offers for a customer (GET) or create a new loan offer (POST).
        Endpoint: GET/POST /customers/{id}/loanoffers
        """
        customer = self.get_object()
        
        if request.method == 'GET':
            loans = Loan.objects.filter(customer=customer)
            serializer = LoanSerializer(loans, many=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            # Handle loan data - extract from nested 'loanData' if present, otherwise use request.data directly
            loan_data = request.data.get('loanData', request.data).copy()
            loan_data['customer'] = customer.id
            
            serializer = LoanSerializer(data=loan_data)
            if serializer.is_valid():
                loan = serializer.save()
                return Response(
                    LoanSerializer(loan).data,
                    status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)