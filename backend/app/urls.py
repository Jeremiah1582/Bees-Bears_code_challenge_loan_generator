"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from partners.views import PartnerViewSet
 
router = DefaultRouter()
router.register(r'partners', PartnerViewSet, basename='partner')    


urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'api/partners/{id}/customers', PartnerViewSet.as_view({'get': 'get_customer_by_id'}), name='get_customer_by_id'),
    path(f'api/partners/{id}/customers', PartnerViewSet.as_view({'post': 'create_customer'}), name='create_customer'),
    path(f'api/partners/{id}/customers', PartnerViewSet.as_view({'put': 'update_customer'}), name='update_customer'),
    path(f'api/partners/{id}/customers', PartnerViewSet.as_view({'delete': 'delete_customer'}), name='delete_customer'),
]



