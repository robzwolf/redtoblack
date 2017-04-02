from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
from flaskext.mysql import MySQL
import _mysql

app = Flask(__name__)
api = Api(app)

class registerUser(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('firstName', type=str, help='Email address to create user')
            parser.add_argument('lastName', type=str, help='Email address to create user')
            parser.add_argument('email', type=str, help='Password to create user')
            parser.add_argument('password', type=str, help='Password to create user')
            args = parser.parse_args()

            _firstName = args['firstName']
            _lastName = args['lastName']
            _email = args['email']
            _password = args['password']

            db = _mysql.connect(host="localhost", port=3306, passwd="", db="redtoblack", user="root")
            # db.query("""INSERT INTO `typeofactivity` (`activityID`, `activity`) VALUES ('2', 'sss');""")

            query = "INSERT INTO `user` (`firstName`,`lastName`,`email`,`password`) VALUES ('"+_firstName+"','"+_lastName+"','"+_email+"','"+_password+"');"

            print(query)
            db.query(query)

        except Exception as e:
            return {'error': str(e)}

class updateDetails(Resource):
    def post(self):
        try:
            # Parse the arguments
            parser = reqparse.RequestParser()
            parser.add_argument('userID', type=str, help='Email address to create user')
            parser.add_argument('rentAmount', type=str, help='Email address to create user')
            parser.add_argument('sfaAmount', type=str, help='Email address to create user')
            parser.add_argument('additionalAmount', type=str, help='Password to create user')
            parser.add_argument('universityName', type=str, help='Password to create user')
            args = parser.parse_args()

            userID = args['userID']
            rentAmount = args['rentAmount']
            sfaAmount = args['sfaAmount']
            additionalAmount = args['additionalAmount']
            universityName = args['universityName']

            db = _mysql.connect(host="localhost", port=3306, passwd="", db="redtoblack", user="root")
            # db.query("""INSERT INTO `typeofactivity` (`activityID`, `activity`) VALUES ('2', 'sss');""")

            # query = "INSERT INTO userdetails (`userID`,`rentAmount`,`sfaAmount`,`additionalAmount`,`universityName`) VALUES ('"+userID+"','"+rentAmount+"','"+sfaAmount+",',"+additionalAmount+'") ON DUPLICATE KEY UPDATE ();"

            # Check if it existssa
            select_query = "SELECT * FROM userdetails WHERE userID = %s" % (userID)

            result = db.query(select_query)
            result = db.fetch_row(how=1)

            print(result)

            if (len(result) < 1):
                #INSERT
                query = "INSERT INTO userdetails (`userID`,`rentAmount`,`sfaAmount`,`additionalAmount`,`universityName`) VALUES ('"+userID+"','"+rentAmount+"','"+sfaAmount+",',"+additionalAmount+"');"

            else:
                 #UPDATE
                query = "UPDATE userdetails SET `rentAmount` = %s, `sfaAmount` = %s, `additionalAmount` = %s WHERE `userID` = %s" % (rentAmount, sfaAmount, additionalAmount, userID)

            db.query(query)




            # query = "INSERT INTO userdetails (`userID`,`rentAmount`,`sfaAmount`,`additionalAmount`,`universityName`) VALUES (%s,%s,%s,%s,%s) ON DUPLICATE KEY UPDATE (`userID` = VALUES(%s),`rentAmount` = VALUES(%s),`sfaAmount` = VALUES(%s),`additionalAmount` = VALUES(%s),`universityName` = VALUES(%s));" % (userID, rentAmount, sfaAmount, additionalAmount, universityName, userID, rentAmount, sfaAmount, additionalAmount, universityName)

            # cursor.execute("INSERT INTO table VALUES (%s, %s, %s)", (var1, var2, var3))

            # print(query)
            # db.query(query)

        except Exception as e:

            return {'error': str(e)}


api.add_resource(registerUser, '/registerUser')
api.add_resource(updateDetails, '/updateDetails')



app.run(debug=True)