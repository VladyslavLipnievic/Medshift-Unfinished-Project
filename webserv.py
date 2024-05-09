#!/usr/bin/python3
from app import app


if __name__ == '__main__':
    #app = create_app("config")
    app.run(debug=True, host='0.0.0.0')