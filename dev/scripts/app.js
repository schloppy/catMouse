import React from 'react';
import ReactDOM from 'react-dom';

import Board from './board'

import levels from './levels'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentLevel: [],
      score: 0
    }
    this.playLevel = this.playLevel.bind(this);
    this.updateScore = this.updateScore.bind(this)
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
        <Board
          score={this.state.score}
          updateScore={this.updateScore}
          level={this.state.currentLevel} />
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
