from django.http import JsonResponse

def fn_handler404(request, exception):
    return JsonResponse({'detail': 'Not found'}, status=404)