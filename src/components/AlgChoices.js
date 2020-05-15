import React from 'react';
import './AlgChoices.css';

const AlgChoices = props => {
  const { chooseAlg, algChoice, algs } = props;

  return (
    <div id="alg-choices">
      <h2>First, select a mode</h2>
      <ul>
        {algs.map((alg, i) => {
          return (
            <li
              key={i}
              onClick={() => chooseAlg(i)}
              className={i === algChoice ? 'chosen' : ''}
            >
              {alg}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AlgChoices;
