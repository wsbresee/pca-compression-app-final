import React from 'react';
import { faFileAudio } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HasUpload = props => {
  return (
    <React.Fragment>
      <FontAwesomeIcon icon={faFileAudio} size="6x" />
      <h4>{props.fileName}</h4>

      <input
        type="file"
        name="file"
        id="file"
        className="input-file"
        onChange={props.handleChange}
      />
      <label htmlFor="file" className="input-label">
        Choose a File
      </label>
    </React.Fragment>
  );
};

export default HasUpload;
