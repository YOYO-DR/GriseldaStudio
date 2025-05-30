import os
import sys
from dotenv import load_dotenv

def main():
    """Run administrative tasks."""
    if 'WEBSITE_HOSTNAME' not in os.environ:
        load_dotenv()
    settings_module = "config.production" if 'WEBSITE_HOSTNAME' in os.environ else 'config.settings'
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()