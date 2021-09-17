import React from 'react'

function Point(props) {
    const [selected, updateSelected] = props.selected
    const [lines, updateLines] = props.sudoku
    const clickHandler = _ => {
        updateSelected(props.number.position)
    }
    const getError = _ => {
        let error = ""
        if (
            selected[0] !== null &&
            props.number.number.length === 1 &&
            lines[selected[0]][selected[1]].number.length === 1 &&
            lines[selected[0]][selected[1]].number[0] === props.number.number[0]
        ) {
            error = "glow"
        }
        lines.map(l => l.map(p => {
            if (
                props.number.number.length === 1 &&
                p.number.length === 1 &&
                props.number.number[0] === p.number[0] &&
                (
                    (
                        p.position[1] === props.number.position[1] ||
                        p.position[0] === props.number.position[0]
                    ) || (
                        parseInt(p.position[0] / 3) === parseInt(props.number.position[0] / 3) &&
                        parseInt(p.position[1] / 3) === parseInt(props.number.position[1] / 3)
                    )
                ) && !(
                    p.position[1] === props.number.position[1] &&
                    p.position[0] === props.number.position[0]
                )
            ) {
                error = "error"
            }
        }))
        return error
    }
    const getSelected = _ => {
        if (selected[0] === props.number.position[0] && selected[1] === props.number.position[1]) {
            return "selected"
        } else if (selected[0] === props.number.position[0] || selected[1] === props.number.position[1]) {
            return "selected-row"
        } else {
            return ""
        }
    }
    return (
        <div
            id="point"
            onClick={clickHandler}
            className={`one-point ${getError()} ${props.number.show && 'const-number'} ${getSelected()}`} >
            {props.number.number.map(n => (
                <div key={n}>{n}</div>
            ))}
        </div>
    )
}

export default Point
