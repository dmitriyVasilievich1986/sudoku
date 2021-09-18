import React from 'react'
import Point from './Point'

function Line(props) {
    return (
        <div className="one-line">
            {props.line.map((p, i) => <Point number={p} key={i} />)}
        </div>
    )
}

export default Line
