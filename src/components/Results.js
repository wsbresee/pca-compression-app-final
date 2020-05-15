import React from 'react';
import AudioPlayer from './AudioPlayer';
import Graph from './Graph';

const getMax = arr => {
  let len = arr.length;
  let max = -Infinity;

  while (len--) {
    max = arr[len] > max ? arr[len] : max;
  }
  return max;
};

const getMin = arr => {
  let len = arr.length;
  let min = Infinity;

  while (len--) {
    min = arr[len] < min ? arr[len] : min;
  }
  return min;
};

const Results = props => {
  const { results } = props;

  let preProcess;
  let postProcess;
  let loss;
  let freqPre;
  let freqPost;
  let freqLoss;
  if (results[1] && results[1][1]) {
    preProcess = results[1][1];
    postProcess = results[2][1];
    loss = results[3][1];
    freqPre = results[4][1];
    freqPost = results[5][1];
    freqLoss = results[6][1];

  } else {
    preProcess = [];
    postProcess = [];
    loss = [];
    freqPre = [];
    freqPost = [];
    freqLoss = [];
  }

  return (
    <div className="results">
      {preProcess.length > 0 && (
        <Graph
          name="PreProcess"
          explanation="This is a visualization of the amplitude over time of your original audio file. This is how audio is most often visualized, and probably looks familiar to you. Peaks correspond to the louder parts of the audio. Frequency information is not clear from this display."
          data={preProcess}
          domain={{
            x: [0, preProcess.length - 1],
            y: [getMin(preProcess), getMax(preProcess)],
          }}
        />
      )}
      {postProcess.length > 0 && (
        <Graph
          name="PostProcess"
          explanation="This is a visualization of the amplitude over time of your audio file, reconstructed from the number of principal components you selected. This may not look very different from the PreProcess graph. However, some loss has likely occurred. You may be able to find some differences between the two graphs, particularly if you selected a low number of components. I have an easier time seeing the difference between the two graphs when the first graph indicates a period of silence, but the second graph contains some noise as a result of the compression process."
          data={postProcess}
          domain={{
            x: [0, postProcess.length - 1],
            y: [getMin(postProcess), getMax(postProcess)],
          }}
        />
      )}
      {loss.length > 0 && (
        <Graph
          name="Loss"
          explanation="This graph shows the difference between the PreProcess and PostProcess graphs. It’s like a cheat sheet for figuring out how much information is lost over time! You’ll likely notice that information was lost during louder parts of the audio, as well as quieter parts. Pay attention to the scale on the left; it’s likely much more precise than the scales of the previous two graphs, indicating that the information lost is a tiny fraction of the information present in both the original and post-process audio files. Nonetheless, a small fraction can have enormous ramifications, as you’ll likely discover by listening to the audio files at the end."
          data={loss}
          domain={{
            x: [0, loss.length - 1],
            y: [getMin(loss), getMax(loss)],
          }}
        />
      )}
      {freqPre.length > 0 && (
        <Graph
          name="PreProcessFFT"
          explanation="This is a visualization of the frequencies present in the original audio file. It is simply a transformation of the data used to produce the first graph from the time domain into the frequency domain. The Y dimension still shows amplitude, but the X dimension now shows frequency, so you can more effectively use this graph to understand the frequencies present in your audio file."
          data={freqPre}
          domain={{
            x: [0, freqPre.length - 1],
            y: [getMin(freqPre), getMax(freqPre)],
          }}
        />
      )}
      {freqPost.length > 0 && (
        <Graph
          name="PostProcessFFT"
          explanation="Just as the immediately preceding graph visualizes the frequencies present in the original audio file, this graph visualizes the frequencies present in the reconstructed audio file. You’ll likely notice the two graphs are very similar. I generally can’t find significant differences between the two graphs just by looking, so I suggest moving on to the sixth graph, in order to understand frequency loss."
          data={freqPost}
          domain={{
            x: [0, freqPost.length - 1],
            y: [getMin(freqPost), getMax(freqPost)],
          }}
        />
      )}
      {freqLoss.length > 0 && (
        <Graph
          name="FrequencyLoss"
          explanation="This graph reflects the third graph, Loss, transformed to the frequency domain. You can use this graph to better understand the frequency ranges in which most of the information loss takes place. You may discover that lots of mid-spectrum information has been lost."
          data={freqLoss}
          domain={{
            x: [0, freqLoss.length - 1],
            y: [getMin(freqLoss), getMax(freqLoss)],
          }}
        />
      )}
      {freqLoss.length > 0 && (
        <AudioPlayer />
      )}
    </div>
  );
};

export default Results;
