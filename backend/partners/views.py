from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Partner 
from .serializers import PartnerSerializer
from customers.models import Customer
from django.http import Http404
class PartnerViewSet(viewsets.ModelViewSet): 
    serializer_class = PartnerSerializer
    queryset = Partner.objects.all() # get all partners


    def get_customers(self):
        return self.get_object().customers.all() # get all customers for a partner
    
    @action(detail=True, methods=['get'], url_path='customers')
    def get_customer_by_id(self, request, *args, **kwargs):
        '''retreive a partners customer'''
        return Response(self.get_object().customers.filter(id=request.get_params('id')))
      


    @action(detail=True, methods=['post'], url_path='customers')
    def create_customer(self, request, *args, **kwargs):
        try:
            partner = self.get_object()  # Attempt to get the Partner instance
        except Http404:
            raise Http404("Partner not found")

        new_customer = partner.create_new_customer(**request.data)
        if isinstance(new_customer, str):
            return Response({'error': new_customer}, status=status.HTTP_400_BAD_REQUEST)
        return Response(new_customer, status=status.HTTP_201_CREATED)










    @action(detail=True, methods=['put'], url_path='customers')
    def update_customer(self, request, *args, **kwargs):
        '''update a customer for a partner'''
        customer = self.get_object().customers.filter(id=request.get_params('id')).update(request.data)
        return Response(customer)
    
    @action(detail=True, methods=['delete'], url_path='customers')
    def delete_customer(self, request, *args, **kwargs):
        '''delete a customer for a partner'''
        return Response(self.get_customers())