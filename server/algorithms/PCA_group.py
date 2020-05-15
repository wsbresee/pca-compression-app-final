import numpy as np
from sklearn import decomposition
from sklearn import datasets
from functools import *
from server.helpers.graph_helper import *

class PCAGroup:

    def __init__(self, audioFiles, otherParam, calcLossVsNumComp=False):
        data = audioFiles
        originalData = data
        lengthOfDataPoint = max(list(map(lambda x: len(x), data)))
        numZeros = list(map(lambda x: lengthOfDataPoint - len(x), data))
        data = zip(data, numZeros)
        data = list(map(lambda x: np.append(np.array(x[0]), np.zeros(x[1])),\
                        data))
        pca = decomposition.PCA(n_components=otherParam)
        pca.fit(data)
        postCompressedAudio = (np.dot(pca.transform(data)[:, :otherParam],
                                      pca.components_[:otherParam, :]) + mu)[0]
        if numZeros[0] > 0:
            postCompressedAudio = postCompressedAudio[:-numZeros[0]]

        self.name = 'PCA group'
        self.numComponents = otherParam
        self.preCompressedAudio = audioFiles[0]
        self.postCompressedAudio = postCompressedAudio
        self.loss = self.preCompressedAudio - self.postCompressedAudio
        if calcLossVsNumComp==True:
            self.lossVsNumComponents = generateLossVsNumComp(originalData)
        else:
            self.lossVsNumComponents = []
        self.freqPre = myFFT(self.preCompressedAudio)
        self.freqPost = myFFT(self.postCompressedAudio)
        self.freqLoss = myFFT(self.loss)
        self.features = pca.transform(data)

    def getPackagedJson(self):
        return packageJson(self)

def generateLossVsNumComp(data):
    lossVsNumComp = []
    for i in list(range(0, 100)):
        print("Calculating loss for " + str(i) + " components")
        lossVsNumComp.append(getLossSum(PCAGroup(data, i)))
    return lossVsNumComp
