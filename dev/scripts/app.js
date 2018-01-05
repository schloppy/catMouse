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
      currentLevel: [],
      score: 0,
      lives: 5,
      crumbs: 0,
      cheese: 0,
      poison: 0
    }
    this.handleInstructionClick = this.handleInstructionClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.playLevel = this.playLevel.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.updateCrumbs = this.updateCrumbs.bind(this);
    this.updateCheese = this.updateCheese.bind(this);
    this.updatePoison = this.updatePoison.bind(this);
    this.updateLives = this.updateLives.bind(this);
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

  updateLives(v) {
    this.setState({
      lives: this.state.lives + v
    })
  }

  updateCrumbs(v) {
    this.setState({
      crumbs: this.state.crumbs + v
    })
  }

  updateCheese(v) {
    this.setState({
      cheese: this.state.cheese + v
    })
  }

  updatePoison(v) {
    this.setState({
      poison: this.state.poison + v
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
            crumbs={this.state.crumbs}
            cheese={this.state.cheese}
            poison={this.state.poison}
            lives={this.state.lives}
            updateScore={this.updateScore}
            updateLives={this.updateLives}
            updateCrumbs={this.updateCrumbs}
            updateCheese={this.updateCheese}
            updatePoison={this.updatePoison}
            level={this.state.currentLevel}
            isPlaying={this.handlePlayClick}
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
          </div>
        )}
        </div>

          
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


