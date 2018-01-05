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
        Help Stu get to the end of the maze.
      </p>
      {/* <p>
        Help Stu get out of the sewers, through the garden and into the kitchen pantry.
      </p> */}
    </div>
  )
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      showInstructions: false,
      showBoard: false,
      endScreen: false,
      currentLevel: [],
      score: 0
    }
    this.handleInstructionClick = this.handleInstructionClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.playLevel = this.playLevel.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.endScreen = this.endScreen.bind(this);
  }

  handleInstructionClick() {
    this.setState({
      showInstructions: !this.state.showInstructions
    });
  }

  handlePlayClick() {
    this.setState({
      showBoard: !this.state.showBoard
    })
    console.log(this.state.ShowBoard)
  }

  endScreen() {
    this.setState({
      endScreen: !this.state.endScreen
    })
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
            isPlaying={this.handlePlayClick}
            endLevel={this.endScreen}
            />

        ) : (
          //FALSE
          //introduction
          //how to play button
          //play button to show game
          <div className="startScreen">
            <Introduction />
            <div className="startButtons">
                <button
                  className="play"
                  onClick={this.handlePlayClick}>
                  {showBoard ? 'Exit' : 'Play'}
                </button>
                <button
                  className={showInstructions ? 'close' : 'howTo'}
                  onClick={this.handleInstructionClick}
                >
                  {showInstructions ? 'x' : 'How to Play'}
                </button>
            </div>
              {showInstructions ? <Instructions /> : null}
              <Endscreen end={this.state.endScreen}
                currentLevel={levels.indexOf(this.state.currentLevel)}
              score={this.state.score}
              />
          </div>
        )}
        
        </div>

          
      )
    }
}

function Endscreen(props) {
  if(!props.end) {
    return null;
  }
  return (
    <div className="endScreen">
      <p>Congrats you beat level  {props.currentLevel}</p>
      <p>You got {props.score} score!
      </p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));


