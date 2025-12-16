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
from django.db import IntegrityError


class PartnerViewSet(viewsets.ModelViewSet): 
    """ViewSet for managing partners"""
    serializer_class = PartnerSerializer
    queryset = Partner.objects.all() 
        
    @action(detail=True, methods=['get','post'], url_path='customers')
    def customers(self, request, *args, **kwargs):

        if request.method == 'GET':
            """Get all customers for a partner"""
            try: 
                partner = self.get_object() # get the partner object
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
                #------------------------------------------------
        elif request.method == 'POST':
            """Create a new customer for a partner"""
            try:
                partner = self.get_object()
                customer_data = request.data.get('customerData', request.data) 
                print("request.data POST, create customer.........", customer_data)
                serializer = CustomerSerializer(data=customer_data)

                if serializer.is_valid():
                    try:
                        new_customer = serializer.save()
                        partner.customers.add(new_customer)
                        return Response(
                            CustomerSerializer(new_customer).data, 
                            status=status.HTTP_201_CREATED,
                        )
                    except IntegrityError as e:
                        # Handle duplicate email error
                        print("you're in the land of IntegrityError, create customer.........", e)

                        error_message = str(e)
                        if 'email' in error_message.lower() or 'UNIQUE constraint' in error_message:
                            return Response(
                                {
                                    'error': 'A customer with this email already exists.',
                                    'email': request.data.get('email', ''),
                                    'detail': 'Email addresses must be unique. Please use a different email address.'
                                },
                                status=status.HTTP_400_BAD_REQUEST
                            )
                        return Response(
                             {'error': 'Database integrity error occurred.', 'detail': str(e)},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                    
            except Exception as e:
                return Response(
                    {'error': 'An unexpected error occurred.', 'detail': str(e)}, 
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


    