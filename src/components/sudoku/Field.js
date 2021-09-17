import Point from './Point'
import React from 'react'

function Field(props) {
    return (
        <div className="one-field">
            {props.points.map((x, i) => <Point key={i} x={x} />)}
        </div>
    )
}

export default Field
