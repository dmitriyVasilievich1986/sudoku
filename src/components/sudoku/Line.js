import classNames from 'classnames'
import Point from './Point'
import React from 'react'

function Line(props) {
    return (
        <div className={classNames("one-line")}>
            {props.line.map((p, i) => <Point number={p} key={i} />)}
        </div>
    )
}

export default Line
