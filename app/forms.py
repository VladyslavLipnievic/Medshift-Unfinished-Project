from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, DecimalField, BooleanField, PasswordField
from wtforms.validators import DataRequired, InputRequired, NumberRange, EqualTo, ValidationError
from flask_babel import _, lazy_gettext as _l

from flask_login import current_user
