from pydub import AudioSegment
import librosa
import soundfile as sf
import os

def librosa_from_mp3_path(filename):
    a = AudioSegment.from_mp3(filename)
    os.remove(filename)
    tempfile = filename + '.wav'
    a.export(tempfile, format='wav')
    theFile = librosa.load(tempfile, sr=None)
    os.remove(tempfile)
    return theFile

def librosa_to_mp3_path(file, filename, sr=44100):
    if len(file) == 2:
        samples = file[0]
        sr = file[1]
    else:
        samples = file
    tempfile = filename + '.wav'
    sf.write(tempfile, samples, sr, format='wav')
    a = AudioSegment.from_wav(tempfile)
    a.export(filename, format='mp3')
    os.remove(tempfile)
    return filename
