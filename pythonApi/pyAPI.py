from flask import Flask, request
from flask import jsonify
from config import config
from flask_cors import CORS
import json
import pickle
import joblib
import pandas as pd
import sys
import os
import uuid

city = 0
squareFeets = 0
bedrooms = 0
bathrooms = 0
property = 1
kitchen = 1
bathroom_r1r6 = 1
bedrooms_r1r6 = 1
interior = 1
exterior = 0
propertyType = ""

def create_app(enviroment):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(enviroment)
    return app

enviroment = config['development']
app = create_app(enviroment)


def readJson():
    global city,propertyType, exterior, bedrooms_r1r6, squareFeets, bedrooms, bathrooms, property, kitchen, bathroom_r1r6, interior
    city = inputData["city"]
    squareFeets = inputData["squareFeets"]
    propertyType = inputData["propertyType"]
    try:
        bedrooms = inputData["response"]["solutions"]["roomtype"]["summary"]["count"]["room-bedroom"]
        if(bedrooms == None):
            bedrooms = 0
    except:
        bedrooms = 0
    
    try:
        bathrooms = inputData["response"]["solutions"]["roomtype"]["summary"]["count"]["bathroom"]
        if(bathrooms == None):
            bathrooms = 0
    except:
        bathrooms = 0

    try:
        property = inputData["response"]["solutions"]["r1r6"]["property"]["score"]
        if(property == None):
            property = 1
    except:
        property = 1

    try:
        kitchen = inputData["response"]["solutions"]["r1r6"]["summary"]["score"]["kitchen"]
        if(kitchen == None):
            kitchen = 1
    except:
        kitchen = 1

    try:
        bathroom_r1r6 = inputData["response"]["solutions"]["r1r6"]["summary"]["score"]["bathroom"]
        if(bathroom_r1r6 == None):
            bathroom_r1r6 = 1
    except:
        bathroom_r1r6 = 1

    try:
        bedrooms_r1r6 = inputData["response"]["solutions"]["r1r6"]["summary"]["score"]["bedrooms"]
        if(bedrooms_r1r6 == None):
            bedrooms_r1r6 = 1
    except:
        bedrooms_r1r6 = 1
    
    try:
        interior = inputData["response"]["solutions"]["r1r6"]["summary"]["score"]["interior"]
        if(interior == None):
            interior = 1
    except:
        interior = 1

    try:
        exterior = inputData["response"]["solutions"]["r1r6"]["summary"]["score"]["exterior"]
        if(exterior == None):
            exterior = 1
    except:
        exterior = 1



def jsonFormat():
    global data
    data = {
        "city": city,
        "squareFeets": squareFeets,
        "bedrooms": bedrooms,
        "bathrooms": bathrooms,
        "propertyType": propertyType,
        "image_data": {
            "r1r6": {
                "property": property,
                "kitchen": kitchen,
                "bathroom": bathroom_r1r6,
                "interior": interior,
                "bedrooms": bedrooms_r1r6,
                "exterior": exterior
            }
        }
    }

def formatJoblib():
    #print(data)
    modelo = joblib.load('../ai_models/restb_xgboost.joblib')

    
    df = pd.DataFrame(columns=['bathroom_r1r6', 'exterior_r1r6', 'interior_r1r6','kitchen_r1r6', 'property_r1r6', 'property_type', 'bathrooms_full', 'bedrooms_total','living_area','postal_code'])
    #bl = preprocessing.LabelEncoder()

    #print(pd.DataFrame(property_dict))
    property_dict = {}
    property_dict['bathroom_r1r6'] = data['image_data']['r1r6']['bathroom']
    property_dict['exterior_r1r6'] = data['image_data']['r1r6']['exterior']
    property_dict['interior_r1r6'] = data['image_data']['r1r6']['interior']
    property_dict['kitchen_r1r6'] = data['image_data']['r1r6']['kitchen']
    property_dict['property_r1r6'] = data['image_data']['r1r6']['property']
    property_dict['property_type'] = data['propertyType']
    property_dict['bathrooms_full'] = data['bathrooms']
    property_dict['bedrooms_total'] = data['bedrooms']
    property_dict['living_area'] = data['squareFeets']
    property_dict['postal_code'] = data['city']
    

    #df = pd.concat([pd.DataFrame(property_dict, index=[0])])
    df = df._append(property_dict, ignore_index=True)

    print(df.head(10))
    df['bathroom_r1r6'] = df['bathroom_r1r6'].astype('float')
    df['exterior_r1r6'] = df['exterior_r1r6'].astype('float')
    df['interior_r1r6'] = df['interior_r1r6'].astype('float')
    df['kitchen_r1r6'] = df['kitchen_r1r6'].astype('float')
    df['property_r1r6'] = df['property_r1r6'].astype('float')
    df['bathrooms_full'] = df['bathrooms_full'].astype('float')
    df['bedrooms_total'] = df['bedrooms_total'].astype('float')
    df['living_area'] = df['living_area'].astype('float')
    df["postal_code"] = df['postal_code'].astype('category')
    df["property_type"] = df['property_type'].astype('category')

    training_columns = ['bathroom_r1r6', 'exterior_r1r6', 'interior_r1r6', 'kitchen_r1r6', 'property_r1r6',
                    'bathrooms_full', 'bedrooms_total', 'living_area',
                    'property_type_general manufactured', 'property_type_general single family',
                    'property_type_general single family attached', 'property_type_general single family detached',
                    'property_type_townhome', 'postal_code_90603', 'postal_code_90620', 'postal_code_90621',
                    'postal_code_90631', 'postal_code_90680', 'postal_code_91708', 'postal_code_91709',
                    'postal_code_91710', 'postal_code_91723', 'postal_code_91745', 'postal_code_91748',
                    'postal_code_91750', 'postal_code_91762', 'postal_code_91763', 'postal_code_91765',
                    'postal_code_91767', 'postal_code_91789', 'postal_code_91791', 'postal_code_91792',
                    'postal_code_92801', 'postal_code_92804', 'postal_code_92805', 'postal_code_92821',
                    'postal_code_92823', 'postal_code_92831', 'postal_code_92832', 'postal_code_92835',
                    'postal_code_92860', 'postal_code_92878', 'postal_code_92880', 'postal_code_92882']

    # Asegúrate de que las columnas coincidan
    df = df.reindex(columns=training_columns, fill_value=0)

    #df = pd.get_dummies(df, columns=['property_type', 'postal_code'])

    print("Tetas")
    print(df.info())
    #le = preprocessing.LabelEncoder()
    #df['property_type'] = le.fit_transform(df['property_type'])

    # Preprocesar los datos si es necesario
    # ...
    #print(df.head(10))
    # Aplicar el modelo a los datos
    resultados = modelo.predict(df)

    # Procesar los resultados si es necesario
    # ...

    # Guardar los resultados en un archivo de salida
    print(str(resultados[0]).split(".")[0]+" €")
    return str(resultados[0]).split(".")[0]+" €"


@app.route('/r1r6', methods=['POST'])
def get_users():
    global inputData
    inputData = request.json
    readJson()
    jsonFormat()
    price = formatJoblib()
    response = {'price': price, 'message': 'success'}
    return jsonify(response)


@app.route('/images', methods=['POST'])
def images():
    if 'files' not in request.files:
        return 'No images found'

    files = request.files.getlist('files')
    random_uuid = uuid.uuid4()
    image_index = 0
    images_urls = []
    os.mkdir('../public/' + str(random_uuid))

    for file in files:
        if file.filename == '':
            return 'Uno o más archivos no tienen un nombre válido'

        file.save('../public/' + str(random_uuid) + '/' + str(image_index) + '.jpg')
        images_urls.append(str(random_uuid) + '/' + str(image_index) + '.jpg')
        image_index += 1
    
    return images_urls




if __name__ == '__main__':
    app.run(debug=True)

