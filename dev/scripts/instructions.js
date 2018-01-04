import React from 'react';

function Instructions(props) {
    if (!props.instructions) {
        return null
    }
    return 
    (
        <div className="instructions">

            <h2>How to Play</h2>
            <p>
                Help Stu get out of the sewers, through the garden and into the kitchen pantry.
            </p>
            <ul>
                <li>Use your arrow keys to move Stu around the maze to the finish line.
                <span className="arrows"></span>
                </li>
                <li>You can pick up crumbs and cheese on your way...
                <span className="crumbs"></span>
                    <span className="cheese"></span>
                </li>
                <li>But avoid all tricky traps and fierce felines on the prowl.
                    <span className="trap"></span>
                    <span className="cat"></span>
                </li>
                <li>There are also bridges you may have to cross to get to the finish line. Just hit the switch to change the bridge direction.
                <span class="switch"></span>
                    <span class="bridge"></span>
                </li>
            </ul>

        </div>
    )
}


export default Instructions