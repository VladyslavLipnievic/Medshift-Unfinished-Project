import os
#basedir = os.path.abspath(os.path.dirname(__file__))
class Config(object):
    #SQLALCHEMY_ECHO = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'try-to-guess'
    WTF_CSRF_TIME_LIMIT = 864000
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI =  'postgresql://medshift:medshift@127.0.0.1:5432/prod1'
    LANGUAGES = ['en', 'ru', 'lt']
