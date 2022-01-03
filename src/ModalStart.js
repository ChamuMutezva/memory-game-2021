import React from 'react'

function ModalStart() {
    return (
        <div className='modal-start-game'>
            <fieldset>
                <legend>Select Theme</legend>
                <input type="radio" name="theme" id="numbers" value="numbers" />
                <label htmlFor="numbers">Numbers</label>
                <input type="radio" name="theme" id="icons" value="icons" />
                <label htmlFor="icons">Icons</label>
            </fieldset>

            <fieldset>
                <legend>Number of players</legend>

                <input type="radio" name="players" id="one" value="1" />
                <label htmlFor="one">1</label>

                <input type="radio" name="players" id="two" value="2" />
                <label htmlFor="two">2</label>

                <input type="radio" name="players" id="three" value="3" />
                <label htmlFor="three">3</label>

                <input type="radio" name="players" id="four" value="4" />
                <label htmlFor="four">4</label>
            </fieldset>

            <fieldset>
                <legend>Grid size</legend>

                <input type="radio" name="grid-size" id="four-square"/>
                <label htmlFor="four-square">4X4</label>

                <input type="radio" name="grid-size" id="six-square" />
                <label htmlFor="six-square">6X6</label>
            </fieldset>

            <button>Start Game</button>
            
        </div>
    )
}

export default ModalStart
