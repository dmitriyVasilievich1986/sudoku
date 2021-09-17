import React from 'react'
import Point from './Point'

function Line(props) {
    // console.log(props.line)
    return (
        <div className="one-line">
            {props.line.map((p, i) => <Point number={p} key={i} selected={props.selected} sudoku={props.sudoku} />)}
        </div>
    )
}

export default Line
