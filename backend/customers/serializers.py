from rest_framework import serializers
from customers.models import Customer


class CustomerSerializer(serializers.ModelSerializer): 
    full_name= serializers.CharField(source="full_name", read_only= True)
  


    class Meta: 
        model= Customer
        fields= ["id", "full_name", "loans","credit_score","created_at", "partner"]
        read_only=("id", "created_at", "updated_at")

    def get_partner(self, obj):
        from partners.serializers import PartnerSerializer
        return PartnerSerializer(obj.partner.all(), many=True, read_only=True).data

 
    def validate_email(self, value):
        """Ensure email is lowercase for consistency"""
        return value.lower().strip()
    
    def validate_creditScore(self, value): 
        """Validate credit score range"""
        if value < 300 or value > 850:
            raise serializers.ValidationError("Credit score must be between 300 and 850.")
        return value



