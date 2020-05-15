import React from 'react';
import './Parameter.css';

const Parameter = props => {
  const { chooseParam, paramChoice } = props;

  return (
    <div id="param-choices">
      <h2>Then, choose a number of principal components</h2>
      <form>
      <input
        type="text"
        onChange={() => chooseParam(event.target.value)}
      >
      </input>
      </form>
    </div>
  );
};

export default Parameter;
