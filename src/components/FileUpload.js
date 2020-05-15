import React from 'react';

import HasUpload from './HasUpload';
import EmptyUpload from './EmptyUpload';

import './FileUpload.css';

class FileUpload extends React.Component {
  constructor() {
    super();
    this.dropRef = React.createRef();
    this.state = {
      dragging: false,
      dragCount: 0,
    };

    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragIn = this.handleDragIn.bind(this);
    this.handleDragOut = this.handleDragOut.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleDragIn(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState(state => ({
        dragging: true,
        dragCount: state.dragCount + 1,
      }));
    }
  }

  handleDragOut(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState(state => {
      const dragCount = state.dragCount - 1;

      return { dragCount, dragging: dragCount > 0 };
    });
  }

  handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ dragging: false, dragCount: 0 });

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files;

      if (files.length === 1) {
        this.props.chooseFile(files[0]);
      }
      e.dataTransfer.clearData();
    }
  }

  handleChange(e) {
    e.preventDefault();

    if (e.target.files[0]) this.props.chooseFile(e.target.files[0]);
  }

  componentDidMount() {
    let box = this.dropRef.current;
    box.addEventListener('dragenter', this.handleDragIn);
    box.addEventListener('dragleave', this.handleDragOut);
    box.addEventListener('dragover', this.handleDrag);
    box.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    let box = this.dropRef.current;
    box.removeEventListener('dragenter', this.handleDragIn);
    box.removeEventListener('dragleave', this.handleDragOut);
    box.removeEventListener('dragover', this.handleDrag);
    box.removeEventListener('drop', this.handleDrop);
  }

  render() {
    const { dragging } = this.state;
    const fileName = this.props.file.name || '';
    return (
      <div id="file-upload">
        <div
          id="upload-box"
          ref={this.dropRef}
          className={dragging ? 'dragging' : fileName !== '' ? 'has-file' : ''}
        >
          {fileName === '' ? (
            <EmptyUpload handleChange={this.handleChange} />
          ) : (
            <HasUpload handleChange={this.handleChange} fileName={fileName} />
          )}
        </div>
        {fileName !== '' && (
          <button
            type="button"
            id="compress-button"
            onClick={this.props.compressFile}
          >
            Run PCA
          </button>
        )}
      </div>
    );
  }
}

export default FileUpload;
