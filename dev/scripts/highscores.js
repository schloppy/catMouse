import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCM-ubp8ULcJk03P2GhFro2AHu0OmxyOwI",
    authDomain: "catmouse-1337.firebaseapp.com",
    databaseURL: "https://catmouse-1337.firebaseio.com",
    projectId: "catmouse-1337",
    storageBucket: "catmouse-1337.appspot.com",
    messagingSenderId: "157042958941"
};
firebase.initializeApp(config);

const dbRef = firebase.database().ref();

export default class Highscores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerTotalScore: props.totalScore,
            playerName:'',
            submitScore: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        console.log(e.target.value)
        this.setState({playerName: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        dbRef.push(
            {
                playerName: this.state.playerName,
                playerTotalScore: this.state.playerTotalScore
            }
        )
        this.setState({submitScore: false})
    }

    render() {
        return (
            <div className="highscoresBoard">
                <h2>Highscores</h2>
                
                {this.state.submitScore ? (
                    <div className="submitScore">
                        <form action="" onSubmit={this.handleSubmit}>
                            <input type="text" name="playerName"
                                onChange={this.handleChange}
                                value={this.state.playerName} />
                            <input type="number"
                                value={this.state.playerTotalScore}
                                readOnly />
                            <button className="submit" type="submit">Submit</button>
                        </form>
                    </div>
                ) 
                : null}

                <List />
            </div>
        )
    }
}

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            storedItems: [],
            scoresByOrder: [],
            top10Scores: [],
        }
        this.compareValues = this.compareValues.bind(this);
    }

    compareValues(key, order = 'asc') {
    return function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order == 'asc') ? (comparison * -1) : comparison
        );
    };
}

    componentDidMount() {
        dbRef.on('value', (firebaseData) => {
            const allScores = [];
            const allScoresData = firebaseData.val();

            for (let itemsKey in allScoresData) {
                allScores.push({
                    key: itemsKey,
                    playerName: allScoresData[itemsKey].playerName,
                    totalScore: allScoresData[itemsKey].playerTotalScore
                })
            }
            this.setState({
                storedItems: allScores,
                scoresByOrder: allScores.sort(this.compareValues('totalScore')),
                top10Scores: this.state.scoresByOrder.slice(0,10)
            });
        })
    }

    render() {
        return (
                <ul className="topScores">
                    {/* loop and print only top 15 */}
                    {this.state.top10Scores.map((pair) => {
                        return (
                            <li key={pair.key}>
                                <p className="playerName">{pair.playerName}</p>
                                <p className="score">{pair.totalScore}</p>
                            </li>
                        )
                    })}
                </ul>
        )
    }
}