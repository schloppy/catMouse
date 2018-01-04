import React from 'react';
import ReactDOM from 'react-dom';
import Instructions from './instructions';
import Board from './board';
import levels from './levels';

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
    this.setState(prevState => {
      showBoard: !prevState.showBoard
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
      return (

        // conditionalp rendering based on button clicks
        // button click play display board
        // button click how to play display Instructions
          
        <div className="gameFrame">
          
          <button onClick={this.handlePlayClick}>
            {this.state.showBoard ? 'Play' : 'Close'}
          </button>
          
          <button onClick={this.handleInstructionClick}>
            {this.state.showInstructions ? 'Close' : 'How to Play'}
          </button>
            <Instructions instructions={this.state.showInstructions} />
          <Board
            score={this.state.score}
            updateScore={this.updateScore}
            level={this.state.currentLevel}
            play={this.state.showBoard}
            />

        </div>

          
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));


