import React from 'react';
import axios from 'axios';
import './App.css';
import Topbar from './Topbar';
import AlgChoices from './AlgChoices';
import Parameter from './Parameter';
import FileUpload from './FileUpload';
import LoadingScreen from './LoadingScreen';
import Graph from './Graph';
import Results from './Results';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      algChoice: null,
      paramChoice: null,
      file: {},
      results: [],
      loading: false,
    };
    this.chooseAlg = this.chooseAlg.bind(this);
    this.chooseParam = this.chooseParam.bind(this);
    this.chooseFile = this.chooseFile.bind(this);
    this.compressFile = this.compressFile.bind(this);
  }

  chooseAlg(algChoice) {
    this.setState({ algChoice });
  }

  chooseParam(paramChoice) {
    this.setState({ paramChoice });
  }

  chooseFile(file) {
    this.setState({ file });
  }

  compressFile() {
    if (this.state.file.name) {
      const file = new Blob([this.state.file]);
      const algChoice = this.state.algChoice;
      const paramChoice = this.state.paramChoice;

      const formData = new FormData();

      formData.append('file', file, file.filename);
      formData.append('algChoice', algChoice);
      formData.append('paramChoice', paramChoice);
      this.setState({ loading: true });
      axios
        .post('/compress', formData, {})
        .then(({ data }) => {
          this.setState({ loading: false, results: data });
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err);
        });
    }
  }

  componentDidMount() {
    axios.get('/algs').then(({ data }) => {
      this.setState({ algs: data });
    });
  }

  render() {
    const algs = this.state.algs || [];

    const { algChoice, paramChoice, file, loading, results } = this.state;
    const { chooseAlg, chooseParam, chooseFile, compressFile } = this;

    return (
      <React.Fragment>
        <Topbar />
        <div className='writing'>
        <h1>PCA and Audio Experimentation Station</h1>
        <p>With this application, you can quickly and easily explore Principal Component Analysis with audio data. You’ll provide audio and choose the number of principal components you’d like to preserve. The Experimentation Station will generate a number of visualizations of the impact of PCA on your audio data, with a particular focus on data integrity and signal loss.</p>
        <h2>Single Audio File Mode</h2>
        <p>The Experimentation Station has two different modes. The first should be used with a single audio file. In this mode, your audio will be chopped up into lots of small chunks, and each of these chunks will be used as a single data point, with a set of principal components. The audio will then be reconstructed from the model and principal components, and the loss will be measured by the difference between the original audio and the reconstructed audio.</p>
        <p>Each chunk is 100 samples wide, so if you preserve fewer than 100 principal components, you are effectively compressing the file. Your compression rate can be determined by dividing the number of components by 100. For example, if you preserve 10 components, your compressed file is roughly 10/100, or a tenth, of the size of the original. This compression algorithm is lossy; in other words, when you compress audio like this, some information is lost. As a result, the compression rate may affect the sound quality. With lower numbers of components, the signal loss can be very audible. Depending on your use case and interests, this might limit the utility of compression with PCA, or it might have interesting creative DSP ramifications.</p>
        <p>As you’ll soon discover, audio compression with PCA is all about the tradeoff between information loss and compression rate!</p>
        <h2>Multiple Audio Files Mode</h2>
        <p>The second mode mode is designed to work with a zipped folder of audio files, and reflects a more typical use case for PCA: preprocessing data for other machine learning algorithms. Using this mode, you’ll be able to explore the information loss associated with the number of components you provide.</p>
        <p>This may be useful as a way to relatively quickly decide on a number of components to preserve when preparing audio data for another application. Try making sure that the audio file can be reconstructed to the point of being comprehensible; if you can’t tell what a sound is after reducing it to a low number of principal components, your model may not be able to either. This mode probably has fewer implications from a file compression or creative DSP perspective, but has significantly more utility from a machine learning or data science perspective. To generate the graphs and audio files, this mode uses only the first audio file present in the .zip file.</p>
        <p>Regardless of which mode you choose, or what your intended use case is, I hope that this application serves as a valuable tool for understanding and exploring the information loss caused by PCA.</p>
        </div>
        <div className="contents">
          <div className="left-side">
            <AlgChoices
              algs={algs}
              chooseAlg={chooseAlg}
              algChoice={algChoice}
            />
            <Parameter chooseParam={chooseParam} paramChoice={paramChoice} />
          </div>
          <FileUpload
            file={file}
            chooseFile={chooseFile}
            compressFile={compressFile}
          />
          {loading && <LoadingScreen />}
        </div>
        <Results results={results} />
      </React.Fragment>
    );
  }
}

export default App;
