import React from 'react';
import ReactDOM from 'react-dom';
import * as firease from 'firebase';

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

const dbRef = firebase.database.ref();

export default class Highscores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerTotalScore: props.totalScore,
            playerName:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({playName: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.playerName)
        console.log(this.state.playerTotalScore)

        dbRef.push(
            {
                playName: this.state.playerName,
                playertotalScore: this.state.playerTotalScore
            }
        )
    }

    render() {
        return (
            <div className="highscoresBoard">
                <h2>Highscores</h2>
                
                <div className="submitScore">
                    <form action="">
                        <input type="text"/>
                        <input type="text"/>
                        <button onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>
                {/* input user name + total score */}
            </div>
        )
    }
}

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            totalScorePlayer:[]
        }
    }

    componentDidMount() {
        dbRef.on('value', (firebaseData) => {
            const allScores = [];
            const allScoresData = firebaseData.val();

            for (let itemsKey in allScoresData) {
                allScores.push({
                    key: itemsKey,
                    playerName: allScoresData.[itemsKey].playerName,
                    totalScore: allScoresData[itemsKey].totalScore
                })
            }
        })
    }
}