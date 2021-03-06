import React from 'react'

function ModalEnd(props) {
    return (
        <footer className={`modal-closed ${props.openModal ? "" : "modal-dialog"}`} >
            <div className="results-panel">
                <h2>Congratulations, you win</h2>
                <h3>Here are the results</h3>
                <div className="moves">
                    <span className="moves-label">Moves</span>
                    <span className="moves-results">{props.moves}</span>
                </div>
                <div className="time-taken">
                    <span className="time-label">Time Taken</span>
                    <span className="time-value">{props.time}</span>
                </div>
                <button onClick={props.click} className="close-modal-btn">Close modal</button>
            </div>
        </footer>
    )
}

export default ModalEnd
