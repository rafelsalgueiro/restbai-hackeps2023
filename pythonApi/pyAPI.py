from flask import Flask, request
from flask import jsonify
from config import config

def create_app(enviroment):
    app = Flask(__name__)
    app.config.from_object(enviroment)
    return app

enviroment = config['development']
app = create_app(enviroment)

@app.route('/r1r6', methods=['GET'])
def get_users():
    print(request.json)
    response = {'message': 'success'}
    return jsonify(response)

@app.route('/images', methods=['POST'])
def images():
    if 'files' not in request.files:
        return 'No se proporcionó ninguna imagen'

    archivos = request.files.getlist('files')

    # Verificar si el archivo tiene un nombre
    for archivo in archivos:
        # Verificar si el archivo tiene un nombre
        if archivo.filename == '':
            return 'Uno o más archivos no tienen un nombre válido'

        archivo.save('../public/' + archivo.filename)

    return 'Imagen subida con éxito'

if __name__ == '__main__':
    app.run(debug=True)