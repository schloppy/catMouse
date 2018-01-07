import React from 'react';
import ReactDOM from 'react-dom';

export default class Instructions extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="instructions">

                <h2>How to Play</h2>
                <ul>
                    <li>
                        <p className="rule">
                            Use your arrow keys to move Stu around the maze to the finish line.
                        </p>
                        <div className="assets">
                            <div className="mouse"></div>
                        </div>
                    </li>
                    <li>
                        <p className="rule">
                            You can pick up crumbs and cheese on your way to earn points...
                        </p>
                        <div className="assets">
                            <div className="x"> </div>
                            <div className="y"> </div>
                        </div>
                    </li>
                    <li>
                        <p className="rule">
                            But avoid the fierce felines on the prowl. If you get caught, you'll loose a life!
                        </p>
                        <div className="assets">
                            <div className="t"> </div>
                        </div>
                    </li>
                    <li>
                        <p className="rule">
                            And if you accidentally run into poison, you will loose 5 points and a life.
                        </p>
                        <div className="assets">
                            <div className="t"> </div>
                        </div>
                    </li>
                    <li>
                        <p className="rule">
                            There are also bridges you may have to cross to get to the finish line. Just hit the switch to change the bridge direction.
                        </p>
                        <div className="assets">
                            <div className="b"> </div>
                            <div className="s"> </div>
                        </div>
                    </li>
                </ul>

            </div>
        )
    }
}