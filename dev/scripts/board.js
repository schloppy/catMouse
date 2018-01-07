import React from 'react';
import ReactDOM from 'react-dom';

import Mouse from './mouse'

export default class Board extends React.Component {
  render() {

    // This code grabs the index of the starting point, then calculates the position that the mouse will start on based on that index
    const { level } = this.props

    const index = level.indexOf('z')

    const multiple = index / 15
    const remainder = multiple - parseInt(multiple)

    const positionTop = (Math.floor(multiple) * 5)
    const positionLeft = (remainder * 100)

    // This code will determine how many lives to display next to the score

    let lives = []

    for (let i = 0; i < this.props.lives; i++) {
      lives.push(<div className="life"></div>)
    }
    
    let score = this.props.score
    if ( score < 0 ) { score = 0 }
    return (
      <div className="board" id="board">
        {this.props.level.map((tile, i) => <div className={`${tile}`} key={i}>.</div>)}
          <Mouse
            updateScore={this.props.updateScore}
            updateCrumbs={this.props.updateCrumbs}
            updateCheese={this.props.updateCheese}
            updatePoison={this.props.updatePoison}
            updateLives={this.props.updateLives}
            pLeft={positionLeft}
            pTop={positionTop}
            isPlaying={this.props.isPlaying}
            endLevel={this.props.endLevel}
          />
        <div className="gameInfo">
          {score}
          <span>
            {lives.map(heart => {
              return heart
            })}
          </span>
        </div>
      </div>
    )
  }
}