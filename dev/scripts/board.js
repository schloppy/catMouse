import React from 'react';
import ReactDOM from 'react-dom';

import Mouse from './mouse'

export default class Board extends React.Component {
  constructor() {
    super()
  }

  render() {
    // This code grabs the index of the maze's starting point, then calculates the position that the mouse will start on based on that index
    const { level } = this.props

    const mouseIndex = level.indexOf('z')

    let multiple = mouseIndex / 15
    let remainder = multiple - parseInt(multiple)

    let mousePositionTop = (Math.floor(multiple) * 5)
    let mousePositionLeft = (remainder * 100)

    // This code will determine how many lives to display next to the score
    let lives = []

    for (let i = 0; i < this.props.lives; i++) {
      lives.push(<div className="life"></div>)
    }
    
    let score = this.props.score + this.props.totalScore
    if ( score < 0 ) { score = 0 }
    return (
      <div className="board" id="board">
        {this.props.level.map((tile, i) => <div className={tile} key={i} num={i}></div>)}
        <Mouse
          updateScore={this.props.updateScore}
          updateCrumbs={this.props.updateCrumbs}
          updateCheese={this.props.updateCheese}
          updatePoison={this.props.updatePoison}
          updateLives={this.props.updateLives}
          pLeft={mousePositionLeft}
          pTop={mousePositionTop}
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