import React from 'react';
import ReactDOM from 'react-dom';
import Instructions from './instructions';
import Board from './board';
import levels from './levels';

function Introduction() {
  return (
    <div className="introduction">
      <h1>Rat Chase</h1>
      <p>
        Help Stu get out of the sewers, through the garden and into the kitchen pantry.
      </p>
    </div>
  )
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      showInstructions: false,
      showBoard: false,
      currentLevel: [],
      score: 0
    }
    this.handleInstructionClick = this.handleInstructionClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.playLevel = this.playLevel.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  handleInstructionClick() {
    this.setState(prevState => ({
      showInstructions: !prevState.showInstructions
    }));
  }

  handlePlayClick() {
    this.setState(prevState => ({
      showBoard: !prevState.showBoard
    }))
    console.log(this.state.ShowBoard)
  }

  playLevel(i) {
    this.setState({
      currentLevel: levels[i]
    });
  }

  componentDidMount() {
    this.playLevel(0);
  }

  updateScore(v) {
    this.setState({
      score: this.state.score + v
    })
  }

    render() {
      const showBoard = this.state.showBoard;
      const showInstructions = this.state.showInstructions;
      return (
        // when showBoard = false, display introduction
        // when showBoard = true, display board
        // onClick "play" button, setState showBoard: true
        
        <div className="gameFrame">
        
        {showBoard ? (
          //TRUE
          <Board
            score={this.state.score}
            updateScore={this.updateScore}
            level={this.state.currentLevel}
            />

        ) : (
          //FALSE
          //introduction
          //how to play button
          //play button to show game
          <div className="startScreen">
            <Introduction />
            <button className="play"
              onClick={this.handlePlayClick}>
              {showBoard ? 'Exit' : 'Play'}
              </button>
              <button className="howTo"
                onClick={this.handleInstructionClick}>
                {showInstructions ? 'Close': 'How to Play'}
                </button>
              
                {showInstructions ? (
                  <Instructions />
                ) : (
                    null
                  )}
                

            </div>
        )}
        </div>

          
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


