import React from 'react'

function ModalEnd(props) {
    return (
        <footer className={`modal-dialog  ${props.openModal ? "modal-closed" : ""}`} >
            <h4>End of game</h4>
            <button onClick={props.click}>Close modal</button>
        </footer>
    )
}

export default ModalEnd
