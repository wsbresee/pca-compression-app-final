import numpy as np
from sklearn import decomposition
from sklearn import datasets
from functools import *
from server.helpers.graph_helper import *

class PCA:

    def __init__(self, audioFile, otherParam, calcLossVsNumComp=False):
        data = np.array(audioFile)
        originalData = data
        lengthOfDataPoint = 100
        numZeros = lengthOfDataPoint - (len(data) % lengthOfDataPoint)
        data = np.append(data, np.zeros(numZeros))
        data = np.reshape(data, (-1, lengthOfDataPoint))
        mu = np.mean(data, axis=0)
        nComp = otherParam
        pca = decomposition.PCA(n_components=nComp)
        pca.fit(data)
        postCompressedAudio = np.reshape(np.dot(pca.transform(data)[:,:nComp],
                                                pca.components_[:nComp,:]) + mu,
                                         (-1))
        if numZeros > 0:
            postCompressedAudio = postCompressedAudio[:-numZeros]

        self.name = 'PCA'
        self.numComponents = otherParam
        self.preCompressedAudio = audioFile
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
    print("start of calculating loss vs num components")
    for i in list(range(0, 100)):
        print("Calculating loss for " + str(i) + " components")
        lossVsNumComp.append(getLossSum(PCA(data, i)))
    print("end of calculating loss vs num components")
    return lossVsNumComp
