import { updateState } from '../../reducers/sudokuSlice'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import React from 'react'

function Point(props) {
    const selected = useSelector(state => state.sudoku.selected)
    const endGame = useSelector(state => state.sudoku.endGame)
    const matrix = useSelector(state => state.sudoku.matrix)
    const dispatch = useDispatch()

    const clickHandler = _ => {
        if (!endGame)
            dispatch(updateState({ selected: props.number.position }))
    }

    const isSelected = _ => {
        return selected[0] === props.number.position[0] && selected[1] === props.number.position[1]
    }

    const isInSelectedRow = _ => {
        return selected[0] === props.number.position[0] || selected[1] === props.number.position[1]
    }

    const isNumberSameAsSelected = _ => {
        return (
            selected[0] !== null &&
            matrix[selected[0]][selected[1]].number.length === 1 &&
            matrix[selected[0]][selected[1]].number[0] == props.number.number[0]
        )
    }

    return (
        <div
            className={classNames("one-point", {
                "glow": !props.number.error && isNumberSameAsSelected(),
                "selected-row": !isSelected() && isInSelectedRow(),
                "const-number": props.number.show,
                "error": props.number.error,
                "selected": isSelected(),
            })}
            onClick={clickHandler}
            id="point"
        >
            {props.number.number.map(n => (
                <div key={n}>{n}</div>
            ))}
        </ div>
    )
}

export default Point
