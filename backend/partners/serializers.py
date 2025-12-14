from rest_framework import serializers
from partners.models import Partner

class PartnerSerializer(serializers.ModelSerializer):


    def get_customers(self, obj):
        from customers.serializers import CustomerSerializer
        return CustomerSerializer(obj.customers.all(), many=True, read_only=True).data


    class Meta:
        model = Partner
        fields = ('id', 'company_name', 'address', 'created_at', 'customers')
        read_only_fields = ("id", "created_at")

    def validateEmail(self,email):
        """Ensure email is lowercase for consistency"""
        return email.lower()
    


