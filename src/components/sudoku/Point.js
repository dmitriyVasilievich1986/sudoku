import { updateState } from '../../reducers/sudokuSlice'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import React from 'react'

function Point(props) {
    const selected = useSelector(state => state.sudoku.selected)
    const endGame = useSelector(state => state.sudoku.endGame)
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

    return (
        <div
            className={classNames("one-point", {
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
