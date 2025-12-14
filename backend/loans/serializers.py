from loans.models import Loan
from rest_framework import serializers


class LoanSerializer(serializers.ModelSerializer): 
    monthly_payments= serializers.DecimalField(source="monthly_payments", max_digits=10,decimal_places=2, read_only=True) #amount the borrower needs to pay back each month during the loan term

    class Meta:
        model = Loan
        fields = (
            'id',
            'customer',
            'loan_amount',
            'annual_rate',
            'term_months',
            'monthly_payments',
            'created_at',
            'updated_at'
        )#Security note: replaced __all__ with tuple for added security 
        
        read_only_fields = (   
            'id',
            'customer',
            'annual_rate',
            'created_at',
            'updated_at'
            )
        
    def validate_loan_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Loan amount must be greater than zero.")
        return value
    
    def validate_term_months(self, value):
        if value <= 0:
            raise serializers.ValidationError("Term must be greater than zero.")
        if value > 600:  # 50 years max
            raise serializers.ValidationError("Term cannot exceed 600 months.")
        return value
    
    def validate_annual_rate(self, value):
        if value < 0 or value > 100:
            raise serializers.ValidationError("Annual rate must be between 0 and 100.")
        return value