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
                    <li>Use your arrow keys to move Stu around the maze to the finish line.
                        <div className="assets">
                            <div className="mouse"></div>
                        </div>
                    </li>
                    <li>You can pick up crumbs and cheese on your way to earn points...
                        <div className="assets">
                            <div className="x"> </div>
                            <div className="y"> </div>
                        </div>
                    </li>
                    <li>But avoid the fierce felines on the prowl. If you get caught, you'll loose a life!
                        <div className="img">
                            <img src="" alt="" />
                        </div>
                    </li>
                    <li>And if you accidentally run into poison, you will loose 5 points.
                        <div className="assets">
                            <div className="t"> </div>
                        </div>
                    </li>
                    <li>There are also bridges you may have to cross to get to the finish line. Just hit the switch to change the bridge direction.
                        <div className="assets">
                            <div className="b"> </div>
                        </div>
                    </li>
                </ul>

            </div>
        )
    }
}