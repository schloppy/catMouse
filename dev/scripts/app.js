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
      score: 0,
      lives: 5,
      crumbs: 0,
      cheese: 0,
      poison: 0
    }
    this.handleInstructionClick = this.handleInstructionClick.bind(this);
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.playLevel = this.playLevel.bind(this);
    this.returnHome = this.returnHome.bind(this);
    this.replayLevel = this.replayLevel.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.endScreen = this.endScreen.bind(this);
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

  endScreen() {
    this.setState({
      endScreen: !this.state.endScreen
    })
  }

  playLevel(i) {
    // if i is greater than 2, keep as 2, else keep currentLevel
    this.setState({
      currentLevel: levels[i]
    });
  }

  componentDidMount() {
    this.playLevel(0);
  }

  returnHome() {
    console.log('return home')
    this.setState({
      endScreen: !this.state.endScreen,
      score: 0,
      lives: 5,
      crumbs: 0,
      cheese: 0,
      poison: 0
    })
  }

  replayLevel() {
    console.log('replay level')
    // toggle board state + reset score, cheese, crumbs, poison
    this.setState({
      endScreen:!this.state.endScreen,
      showBoard:!this.state.showBoard,
      currentLevel: this.state.currentLevel,
      score: 0,
      crumbs: 0,
      cheese: 0,
      poison: 0
    })
  }

  nextLevel() {
    console.log('next level')
    // toggle boardState setState currentLevel + 1, reset score, cheese, crumbs, poison. KEEP CURRENT LIVES
    var currentLevel = this.state.currentLevel + 1
    this.setState({
      showBoard:!this.state.showBoard,
      currentLevel,
      
    })
  }

  resetGame() {
    // reset level, score, scheese, crumbs, poison
    // launch game
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
            endLevel={this.endScreen}
            />

        ) : (
          //FALSE
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
              

                {this.state.endScreen ? (
                  <div className="endScreen">
                  <Endscreen end={this.state.endScreen}
                    currentLevel={levels.indexOf(this.state.currentLevel)}
                    lives={this.state.lives}
                    score={this.state.score}
                    crumbs={this.state.crumbs}
                    cheese={this.state.cheese}
                    poison={this.state.poison} />

                    <div className="buttons">
                      <button className="returnHome" onClick={this.returnHome}>Home</button>
                      <button className="replayLevel" onClick={this.replayLevel}>Replay Level</button>
                      <button className="nextLevel" onClick={this.nextLevel}>Next Level</button>
                    </div>
                  
                  </div>
              )
                : null }
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

  let currentLevel = props.currentLevel + 1
  return (
    <div className="endScreenMsg">
      <h3>Level {currentLevel}</h3>
      <h2>You won!</h2>
      <h2 className="points">You got {props.score} points! </h2>
        <ul className="scoreBoard">
          <li>
          You have <span className="number">{props.lives}</span> lives left.</li>
          <li>
          You nibbled up <span className="number">{props.crumbs}</span> crumbs</li>
          <li>
          You collected <span className="number">{props.cheese}</span> cheese</li>
          <li>
          
          You ran into <span className="number">{props.poison}</span> poison</li>
        </ul>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));


