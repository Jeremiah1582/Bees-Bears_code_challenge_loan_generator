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
    queryset = Customer.objects.all()# show all customers

    @action(detail=True, methods=['get'], url_path='loanoffers')
    def get_loan_offers(self, request, pk=None):
        """
        Get al loan offers for a specific customer.
        Endpoint: GET /customers/{id}/loanoffers
        """
        customer = self.get_object()
        loans = Loan.objects.filter(customer=customer)
        serializer = LoanSerializer(loans, many=True)
        return Response(serializer.data)

    