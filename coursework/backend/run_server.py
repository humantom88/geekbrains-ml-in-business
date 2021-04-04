# USAGE
# Start the server:
# 	python run_front_server.py
# Submit a request via Python:
#	python simple_request.py

# import the necessary packages
import dill
import pandas as pd
import os
dill._dill._reverse_typemap['ClassType'] = type
import flask
import my_pipeline_selectors
from logger import logger 
from time import strftime
from flask_cors import CORS, cross_origin

# initialize our Flask application and the model
app = flask.Flask(__name__)
CORS(app)
model = None

def load_model(model_path):
	# load the pre-trained model
	global model
	with open(model_path, 'rb') as f:
		model = dill.load(f)
	print(model)

modelpath = os.environ.get('MODELS_PATH', "/app/models/xgboost_pipeline.dill")
load_model(modelpath)

@app.route("/", methods=["GET"])
def general():
	return """Welcome to fraudelent prediction process. Please use 'http://<address>/predict' to POST"""

@app.route("/predict", methods=["POST"])
@cross_origin()
def predict():
	# initialize the data dictionary that will be returned from the
	# view
	data = {"success": False}
	dt = strftime("[%Y-%b-%d %H:%M:%S]")
	# ensure an image was properly uploaded to our endpoint
	if flask.request.method == "POST":
		request_json = flask.request.get_json()

		if request_json["embarked"]:
			embarked = request_json['embarked']

		if request_json["sex"]:
			sex = request_json['sex']

		if request_json["pclass"]:
			pclass = request_json['pclass']

		if request_json["age"]:
			age = request_json['age']
		
		if request_json["sibsp"]:
			sibsp = request_json['sibsp']

		if request_json["parch"]:
			parch = request_json['parch']
		
		if request_json["fare"]:
			fare = request_json['fare']
		
		if request_json["fullname"]:
			fullname = request_json['fullname']

		logger.info(f'{dt} Data: fullname={fullname} embarked={embarked}, sex={sex}, pclass={pclass}, age={age}, sibsp={sibsp}, parch={parch}, fare={fare}')

		try:
			preds = model.predict(
				pd.DataFrame({
					"Embarked": [embarked],
					"Sex": [sex],
					"Pclass": [pclass],
					"Age": [age],
					"SibSp": [sibsp],
					"Parch": [parch],
					"Fare": [fare]
				})
			)

		except AttributeError as e:
			logger.warning(f'{dt} Exception: {str(e)}')
			data['predictions'] = str(e)
			data['success'] = False
			return flask.jsonify(data)

		data["predictions"] = str(preds[0])

		# indicate that the request was a success
		data["success"] = True

	# return the data dictionary as a JSON response
	return flask.jsonify(data)

# if this is the main thread of execution first load the model and
# then start the server
if __name__ == "__main__":
	print(("* Loading the model and Flask starting server..."
		"please wait until server has fully started"))
	port = int(os.environ.get('PORT', 8180))
	app.run(host='0.0.0.0', debug=True, port=port)