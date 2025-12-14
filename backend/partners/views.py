from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Partner 
from .serializers import PartnerSerializer
from customers.models import Customer
from customers.serializers import CustomerSerializer
from loans.models import Loan
from loans.serializers import LoanSerializer
from django.http import Http404
from django.shortcuts import get_object_or_404




class PartnerViewSet(viewsets.ModelViewSet): 
    """ViewSet for managing partners"""
    serializer_class = PartnerSerializer
    queryset = Partner.objects.all()


 


        
    @action(detail=True, methods=['get','post'], url_path='customers')
    def create_customer(self, request, *args, **kwargs):

        if request.method == 'GET':
            """Get all customers for a partner"""
            try: 
                partner = self.get_object()
                customers = partner.customers.all()
                serializer = CustomerSerializer(customers, many=True)
                return Response(serializer.data)
            except Partner.DoesNotExist:
                return Response(
                    {'error': 'Partner not found'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
            except Exception as e:
                return Response(
                    {'error': str(e)}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        elif request.method == 'POST':

            """List all customers for a partner (GET) or create a new customer (POST)"""
            try:
                partner = self.get_object()
                serializer = CustomerSerializer(data=request.data)
                if serializer.is_valid():
                    new_customer = serializer.save()
                    partner.customers.add(new_customer)
                    return Response(CustomerSerializer(new_customer).data, status=status.HTTP_201_CREATED)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response(
                    {'error': str(e)}, 
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
    @action(detail=True, methods=['get'], url_path='customers/(?P<customer_id>[0-9]+)')
    def get_customer_by_id(self, request, customer_id=None, *args, **kwargs):
        """Retrieve a specific customer for a partner"""
        partner = self.get_object()
        try:
            customer = partner.customers.get(id=customer_id)
            return Response(CustomerSerializer(customer).data)
        except Customer.DoesNotExist:
            return Response(
                {'error': 'Customer not found for this partner'}, 
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['put', 'patch'], url_path='customers/(?P<customer_id>[0-9]+)')
    def update_customer(self, request, customer_id=None, *args, **kwargs):
        """Update a customer for a partner"""
        partner = self.get_object()
        try:
            customer = partner.customers.get(id=customer_id)
        except Customer.DoesNotExist:
            return Response(
                {'error': 'Customer not found for this partner'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = CustomerSerializer(customer, data=request.data, partial=kwargs.get('partial', False))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['delete'], url_path='customers/(?P<customer_id>[0-9]+)')
    def delete_customer(self, request, customer_id=None, *args, **kwargs):
        """Delete a customer for a partner"""
        partner = self.get_object()
        try:
            customer = partner.customers.get(id=customer_id)
            customer.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Customer.DoesNotExist:
            return Response(
                {'error': 'Customer not found for this partner'}, 
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['post'], url_path='customers/(?P<customer_id>[0-9]+)/loanoffers')
    def create_loan_offer(self, request, customer_id=None, *args, **kwargs):
        """Create a loan offer for a customer"""
        partner = self.get_object()
        try:
            customer = partner.customers.get(id=customer_id)
        except Customer.DoesNotExist:
            return Response(
                {'error': 'Customer not found for this partner'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        loan_data = request.data.copy()
        loan_data['customer'] = customer.id
        
        serializer = LoanSerializer(data=loan_data)
        if serializer.is_valid():
            loan = serializer.save()
            return Response(
                LoanSerializer(loan).data, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='customers/(?P<customer_id>[0-9]+)/loanoffers')
    def list_loan_offers(self, request, customer_id=None, *args, **kwargs):
        """Get all loan offers for a customer"""
        partner = self.get_object()
        try:
            customer = partner.customers.get(id=customer_id)
        except Customer.DoesNotExist:
            return Response(
                {'error': 'Customer not found for this partner'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        loans = Loan.objects.filter(customer=customer)
        serializer = LoanSerializer(loans, many=True)
        return Response(serializer.data)