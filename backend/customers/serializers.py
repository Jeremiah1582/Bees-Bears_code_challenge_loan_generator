from rest_framework import serializers
from customers.models import Customer


class CustomerSerializer(serializers.ModelSerializer): 
    full_name = serializers.CharField( read_only=True)
    annual_income = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    max_loan_amount = serializers.DecimalField( max_digits=12, decimal_places=2, read_only=True)

    class Meta: 
        model = Customer
        fields = [
            "id", 
            "first_name", 
            "last_name", 
            "full_name",
            "email", 
            "income",
            "annual_income",
            "max_loan_amount",
            "credit_score", 
            "phone_number",
            "address",
            "created_at", 
            "updated_at"
        ]
        read_only_fields = ("id", "created_at", "updated_at", "full_name", "max_loan_amount")

    def validate_email(self, value):
        """Ensure email is lowercase for consistency"""
        return value.lower().strip()
    
    def validate_credit_score(self, value): 
        """Validate credit score range"""
        if value < 300 or value > 850:
            raise serializers.ValidationError("Credit score must be between 300 and 850.")
        return value
