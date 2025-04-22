from django.contrib import admin
from .models import Producto

class ProductoAdmin(admin.ModelAdmin):
    # Campos que deseas mostrar en la lista de productos
    list_display = ('nombre', 'slug', 'precio', 'descripcion','estado')
    
    # Campos por los que puedes buscar en el admin
    search_fields = ('nombre', 'descripcion','precio')
    
    # Campos por los que puedes filtrar en el admin
    list_filter = ('precio',)

# Register your models here.
admin.site.register(Producto, ProductoAdmin)