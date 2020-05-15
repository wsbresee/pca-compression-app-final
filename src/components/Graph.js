import React from 'react';
import D3Graph from './D3Graph';
import './Graph.css';

class Graph extends React.Component {
  constructor() {
    super();
    this.DOMNode = React.createRef(null);
    this.getGraphState = this.getGraphState.bind(this);
  }
  componentDidMount() {
    const el = this.DOMNode.current;
    D3Graph.create(el, this.getGraphState());
  }

  componentDidUpdate() {
    const el = this.DOMNode.current;
    D3Graph.update(el, this.getGraphState());
  }

  getGraphState() {
    const data = this.props.data.map((val, i) => ({ x: i, y: val }));
    const margin = 50;

    return {
      data,
      domain: this.props.domain,
      margin,
      name: this.props.name,
    };
  }

  componentWillUnmount() {
    const el = this.DOMNode.current;
    D3Graph.destroy(el);
  }

  render() {
    return (
      <div className="graph-display">
        <h3 className="graph-title">{this.props.name}</h3>
        <p className="graph-explanation">{this.props.explanation}</p>
        <div className="graph" ref={this.DOMNode} />
      </div>
    );
  }
}

export default Graph;
