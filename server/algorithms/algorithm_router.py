import csv
import os
import server.helpers.audio_file_transformations as aft
import sys
import zipfile
from server.algorithms.PCA import PCA
from server.algorithms.PCA_group import PCAGroup


class AlgorithmRouter:

    def __init__(self, algorithm, file, otherParam):
        filename = 'beforePCA.mp3'
        if algorithm == '0':
            file.save(filename)
            theFile = aft.librosa_from_mp3_path(filename)
            samples = theFile[0]
            self.sampleRate = theFile[1]
            self.algorithm = PCA(samples, otherParam)
        elif algorithm == '1':
            zipname = 'temp.zip'
            directory = 'temp/'
            file.save(zipname)
            if os.path.isdir(directory):
                for file in os.listdir(directory):
                    os.remove(directory + file)
            with zipfile.ZipFile(zipname, 'r') as zip_ref:
                zip_ref.extractall(directory)
            audioFiles = []
            for filename in os.listdir(directory):
                theFile = aft.librosa_from_mp3_path(directory + filename)
                samples = theFile[0]
                self.sampleRate = theFile[1]
                audioFiles.append(samples)
            self.algorithm = PCAGroup(audioFiles, otherParam)
            if os.path.isdir(directory):
                for file in os.listdir(directory):
                    os.remove(directory + file)
            os.rmdir(directory)
        aft.librosa_to_mp3_path(\
                self.algorithm.preCompressedAudio,\
                'public/beforePCA.mp3',\
                sr=self.sampleRate)
        aft.librosa_to_mp3_path(\
                self.algorithm.postCompressedAudio,\
                'public/afterPCA.mp3',\
                sr=self.sampleRate)
        with open("public/features.csv", "w") as f:
            writer = csv.writer(f)
            writer.writerows(self.algorithm.features)

    def getPackagedJson(self):
        return self.algorithm.getPackagedJson()
