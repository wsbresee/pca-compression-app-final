import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio } from '@fortawesome/free-regular-svg-icons';

const EmptyUpload = props => {
  return (
    <React.Fragment>
      {<FontAwesomeIcon icon={faFileAudio} size="6x" />}
      <input
        type="file"
        name="file"
        id="file"
        className="input-file"
        onChange={props.handleChange}
      />
      <h4>.mp3 / .wav</h4>
      <label htmlFor="file" className="input-label">
        Choose a File
      </label>
    </React.Fragment>
  );
};

export default EmptyUpload;
