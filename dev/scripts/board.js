import React from 'react';
import ReactDOM from 'react-dom';

import Mouse from './mouse'

export default class Board extends React.Component {
  render() {

    const { level } = this.props

    const index = level.indexOf('z')

    const multiple = index / 15
    const remainder = multiple - parseInt(multiple)

    const positionTop = (Math.floor(multiple) * 5)
    const positionLeft = (remainder * 100)

    return (
      <div className="board" id="board">
        {this.props.level.map((tile, i) => <div className={`${tile}`} key={i}>.</div>)}
        <Mouse
          updateScore={this.props.updateScore}
          pLeft={positionLeft}
          pTop={positionTop}
          isPlaying={this.props.isPlaying}
          endLevel={this.props.endLevel}
        />
        
        <div className="gameInfo">
          <h3>{this.props.score}</h3>
        </div>
      </div>
    )
  }
}