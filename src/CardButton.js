import React from 'react'

function CardButton(props) {
    return (
        <button onClick={props.onClick}>
             {props.num}
        </button>
    )
}

export default CardButton
