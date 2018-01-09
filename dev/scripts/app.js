import React from 'react';
import ReactDOM from 'react-dom';
import Instructions from './instructions';
import Board from './board';
import levels from './levels';
import Highscores from './highscores';

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
      looseScreen: false,
      submitScore: false,
      showHighscores: false,
      currentLevel: [],
      totalScore:0,
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
    this.replayGame = this.replayGame.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.submitScore = this.submitScore.bind(this);
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
      showBoard: !this.state.showBoard,
    })
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

  returnHome() {
    console.log('return home')
    this.setState({
      endScreen: false,
      looseScreen: false,
      showHighScores: false,
      totalScore:0,
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
      totalScore: this.state.totalScore,
      score: 0,
      crumbs: 0,
      cheese: 0,
      poison: 0
    })
  }

  replayGame() {
    this.playLevel(0)
    this.setState({
      looseScreen: false,
      showBoard: true,
      showHighscores: false,
      score: 0,
      totalScore: 0,
      lives:5,
      crumbs: 0,
      cheese: 0,
      poison: 0
    })
  }

  nextLevel() {
    console.log('next level')
    let i = levels.indexOf(this.state.currentLevel)
    console.log(i)
    if (i + 1 > 1) {
      this.setState({
        submitScore: !this.state.submitScore
      })
    }
    this.playLevel(i+1)
    this.setState({
      endScreen: !this.state.endScreen,
      showBoard: !this.state.showBoard,
      totalScore: this.state.totalScore + this.state.score,
      score: 0,
      poison: 0,
      crumbs: 0,
      cheese: 0
    })
  }
  
  submitScore() {
    this.setState({
      totalScore: this.state.totalScore + this.state.score,
      endScreen:false,
      looseScreen: false,
      showHighscores: true
    })
    
  }

  updateScore(v) {
    this.setState({
      score: this.state.score + v
    })
  }

  updateLives(v) {
    if (this.state.lives === 1) {
      this.setState({ 
        looseScreen: true,
        showBoard: false,
        lives: 0
      }) //toggle looseScreen and showBoard
    }
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
  
  componentDidMount() {
    this.playLevel(0);
  }

    render() {
      const showBoard = this.state.showBoard;
      const showInstructions = this.state.showInstructions;
      const submitScore = this.state.submitScore;
      return (
        <div className="gameFrame">
        
        {showBoard ? (
          //TRUE
          <Board
            totalScore={this.state.totalScore}
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
                    totalScore={this.state.totalScore}
                    score={this.state.score}
                    crumbs={this.state.crumbs}
                    cheese={this.state.cheese}
                    poison={this.state.poison} />

                    <div className="buttons">
                      <button className="returnHome" onClick={this.returnHome}>Home</button>
                      <button className="replayLevel" onClick={this.replayLevel}>Replay Level</button>
                      
                      {this.state.submitScore ? (
                        <button className="submitScore" onClick={this.submitScore}>Submit Score</button>
                      ) : (
                        <button className="nextLevel" onClick={this.nextLevel}>Next Level</button>
                      )}              
                    </div>
                  
                  </div> //endScreen
              ) //endScreen trueFalse
                : null }

              {this.state.looseScreen ? (
                <div className="looseScreen"> 
                  <LooseScreen 
                  loose={this.state.looseScreen}
                  currentLevel={levels.indexOf(this.state.currentLevel)}
                  score={this.state.score}
                  totalScore={this.state.totalScore} 
                  crumbs={this.state.crumbs}
                  cheese={this.state.cheese}
                  poison={this.state.poison}
                  />
                  <div className="buttons">
                    <button className="returnHome" onClick={this.returnHome}>Home</button>
                    <button className="replayGame" onClick={this.replayGame}>Replay Game</button>
                    <button className="submitScore" onClick={this.submitScore}>Submit Score</button>
                  </div>

                </div>
              )
              : null }

              {this.state.showHighscores ? (
                <div className="highscoresScreen">
                  <Highscores
                    totalScore={this.state.totalScore}
                  />
                  <div className="buttons">
                      <button className="returnHome" onClick={this.returnHome}>Home</button>
                      <button className="replayGame" onClick={this.replayGame}>Replay Game</button>
                  </div>
                </div>
                ) 
                : null}
          </div>
        )}
        </div>
      )
    }
}

function LooseScreen(props) {
  if(!props.loose) {
    return null;
  }
  if (props.score < 0) { props.score = 0 };
  let score = props.totalScore + props.score
  let currentLevel = props.currentLevel + 1

  return (
    <div className="looseScreenMsg">

      <h3>Level {currentLevel}</h3>

      <h2>Sorry, you killed Stu.</h2>

      <p>Welp, looks like you killed Stu by running into too much poison and lost all his lives.</p>

      <h3>You've nibbled up...</h3>
      <ul className="scoreBoard">
        <li>
          <p className="item">Crumbs</p>
          <div className="x"></div>
          <p className="number">{props.crumbs}</p>
        </li>
        
        <li>
          <p className="item">Cheese</p>
          <div className="y"></div>
          <p className="number">{props.cheese}</p>
        </li>
        
        <li>
          <p className="item">Poison</p>
          <div className="t"></div>
          <p className="number"> - {props.poison}</p>
        </li>
        
        <li>
          <p className="levelScore">Level Score</p>
          <div> </div>
          <p className="number">{props.score}</p>
        </li>
      </ul>
      
      <div className="totalScore">
        <h3>Total Score</h3>
        <h3>{score}</h3>
      </div>
    </div>
  )
}

function Endscreen(props) {
    if(!props.end) {
    return null;
  }
  let currentLevel = props.currentLevel + 1
  if (props.score < 0) { props.score = 0 }
  return (
    <div className="endScreenMsg">
      <h3>Level {currentLevel}</h3>

      <h2>You won!</h2>

      <p>Great job, you got Stu to the end of the maze!</p>

      <h3>You've nibbled up...</h3>
      <ul className="scoreBoard">
        <li>
          <p className="item">Crumbs</p>
          <div className="x"></div>
          <p className="number"> + {props.crumbs} points</p>
        </li>

        <li>
          <p className="item">Cheese</p>
          <div className="y"></div>
          <p className="number">+ {props.cheese} points</p>
        </li>

        <li>
          <p className="item">Poison</p>
          <div className="t"></div>
          <p className="number"> - {props.poison} points</p>
        </li>

        <li>
          <p className="levelScore">Level Score</p>
          <div> </div>
          <p className="number">{props.score} points</p>
        </li>
      </ul>

      <div className="totalScore">
        <h3>Total Score</h3>
        <h3>{props.score + props.totalScore} points</h3>
      </div>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));