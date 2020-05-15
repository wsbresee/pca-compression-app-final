from server.algorithms.algorithm_router import AlgorithmRouter
import sys
import numpy as np
import os
from flask import Flask, jsonify, send_from_directory, request
from pydub import AudioSegment
app = Flask(__name__, static_url_path="", static_folder="/public")

algs = ["Single Audio File", "Multiple Audio Files"]

@app.route('/')
def send_index():
    return send_from_directory("public", "index.html")


@app.route('/algs')
def send_alg_choices():
    return jsonify(algs)


@app.route('/compress', methods=['POST'])
def compress_file():

    # TODO replace all this with API handlers
    algorithm = request.form.get('algChoice')
    otherParam = int(request.form.get('paramChoice'))
    filename = 'temporary'
    file = request.files['file']
    algorithmRouter = AlgorithmRouter(algorithm, file, otherParam)
    json = algorithmRouter.getPackagedJson()
    return jsonify(json)


@app.route('/<path>')
def send_file(path):
    return send_from_directory("public", path)
