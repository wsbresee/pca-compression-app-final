import math
import numpy as np
from sklearn import decomposition
from functools import *

def convertArrayToSize(inArray, size):
    inPerOut = max(math.floor(len(inArray)/size), 1)
    i = 0
    runningSum = 0
    outArray = []
    while i < len(inArray):
        runningSum += abs(inArray[i])
        i += 1
        if i % inPerOut == 0:
            outArray.append(runningSum/inPerOut)
            runningSum = 0
    return outArray

def packageJson(algoInstance, graphLen=1000):
    return [['name', algoInstance.name],
            ['pre_compression', convertArrayToSize( \
                    algoInstance.preCompressedAudio.tolist(), graphLen)],
            ['post_compression', convertArrayToSize( \
                    algoInstance.postCompressedAudio.tolist(), graphLen)],
            ['loss', convertArrayToSize( \
                    algoInstance.loss.tolist(), graphLen)],
            ['freq_pre_compression', convertArrayToSize( \
                    algoInstance.freqPre, graphLen)],
            ['freq_post_compression', convertArrayToSize( \
                    algoInstance.freqPost, graphLen)],
            ['freq_loss', convertArrayToSize( \
                    algoInstance.freqLoss, graphLen)],
            ['loss_vs_num_components', \
                    algoInstance.lossVsNumComponents],
            ['loss_sum', getLossSum(algoInstance)],
            ['features', algoInstance.features.tolist()]]


def getLossSum(self):
    loss = zip(self.preCompressedAudio, self.postCompressedAudio)
    loss = list(map(lambda x: x[0] - x[1], loss))
    loss = reduce(lambda a, b: a + b, loss)
    return abs(loss)

def myFFT(amplitude):
    fourierTransform = np.fft.fft(amplitude)/len(amplitude)
    fourierTransform = fourierTransform[range(int(len(amplitude)/2))]
    # i = 0
    # a = 0
    # s = 0
    # e = 1
    # print("the fourierTransform graph length is " + str(len(fourierTransform)))
    # while i < len(fourierTransform):
    #     if i == a:
    #         fourierTransform[i] = (fourierTransform[i] + s) / e
    #         s = 0
    #         e = 1
    #         print(a)
    #         if a == 0:
    #             a = a + 1
    #         else:
    #             a = a * 2
    #     else:
    #         s += fourierTransform[i]
    #         e += 1
    #         fourierTransform[i] = -1.0
    #     i += 1
    # fourierTransform = list(filter(lambda a: a != -1.0, \
    #                                fourierTransform))
    # print("the fourierTransform graph length is " + str(len(fourierTransform)))
    return fourierTransform
