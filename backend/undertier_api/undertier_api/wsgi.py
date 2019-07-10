"""
WSGI config for undertier_api project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os
import sys
from django.core.wsgi import get_wsgi_application

os.environ["DJANGO_SETTINGS_MODULE"] = "undertier_api.settings"

sys.path.append('E:\undertier\backend\undertier_api')
sys.path.append('E:\undertier\backend\undertier_api\undertier_api')

application = get_wsgi_application()
