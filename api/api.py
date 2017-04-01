from flask import Flask
from flask.ext.restful import Api, Resource
from flask_restful import reqparse


app = Flask(__name__)
api = Api(app)

class registerUser(Resource):
    def post(self, id):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('name', type=str, help='Email address to create user')
            parser.add_argument('email', type=str, help='Password to create user')
            parser.add_argument('username', type=str, help='Password to create user')
            parser.add_argument('password', type=str, help='Password to create user')
            args = parser.parse_args()

            _name = args['email']
            _email = args['password']
            _username = args['password']
            _password = args['password']

            return {'Email': args['email'], 'Password': args['password']}

        except Exception as e:
            return {'error': str(e)}



api.add_resource(UserAPI, '/users/<int:id>', endpoint = 'user')


if __name__ == '__main__':
    app.run(debug=True)