import numpy as np
from sklearn import decomposition
from sklearn import datasets
from functools import *

class PCA:

    def __init__(self, audioFile, otherParam):
        if len(audioFile) == 2:
            audioFile = audioFile[0]
        self.audioFile = audioFile
        self.numComponents = otherParam
        self.preCompressedAudio = audioFile

        data = np.array(audioFile)
        lengthOfDataPoint = 100000
        numZeros = lengthOfDataPoint - (len(data) % lengthOfDataPoint)
        data = np.append(data, np.zeros(numZeros))
        data = np.reshape(data, (-1, lengthOfDataPoint))
        nComp = self.numComponents
        mu = np.mean(data, axis=0)
        pca = decomposition.PCA()
        pca.fit(data)

        self.postCompressedAudio = np.reshape(np.dot(
                                                pca.transform(data)[:,:nComp],
                                                pca.components_[:nComp,:]) + mu,
                                              (-1))

        self.compressed = pca.transform(data)

    def getName(self):
        return "PCA"

    def getPreCompressedAudioAsArray(self):
        return self.preCompressedAudio

    def getPostCompressedAudioAsArray(self):
        return self.postCompressedAudio

    def getLoss(self):
        return self.preCompressedAudio - self.postCompressedAudio

    def getLossSum(self):
        loss = zip(self.preCompressedAudio, self.postCompressedAudio)
        loss = list(map(lambda x: x[0] - x[1], loss))
        loss = reduce(lambda a, b: a + b, loss)
        return abs(loss)

    def getCompressed(self):
        return self.compressed
