from pydub import AudioSegment
import numpy as np
from PCA import *
import librosa
import soundfile as sf

a = AudioSegment.from_mp3('temp.mp3')
y = np.array(a.get_array_of_samples())

pca = PCA(y, 100000)

b = a._spawn(pca.getPostCompressedAudioAsArray().tobytes())
a.export('temp.wav', format='wav')

a = librosa.load('temp.wav', sr=None)
sr = a[1]
print(sr)
pca = PCA(a[0], 50)
b = pca.getPostCompressedAudioAsArray()

sf.write('temp2.wav', b, sr, format='wav')
