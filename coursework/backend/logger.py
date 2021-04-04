import os
import logging
from logging.handlers import RotatingFileHandler

handler = RotatingFileHandler(filename=os.environ.get('LOG_FILE', 'app.log'), maxBytes=100000, backupCount=10)
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(handler)