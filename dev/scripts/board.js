import React from 'react';
import ReactDOM from 'react-dom';

import Mouse from './mouse'

export default class Board extends React.Component {
  render() {
    return (
      <div className="board" id="board">
        {this.props.level.map((tile, i) => <div className={`${tile}`} key={i}>.</div>)}
        <Mouse updateScore={this.props.updateScore} />
        <h3>{this.props.score}</h3>
      </div>
    )
  }
}