import { insertNumber } from '../../reducers/sudokuSlice'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import React from 'react'

function Numbers(props) {
    const numberBalance = useSelector(state => state.sudoku.numberBalance)
    const selected = useSelector(state => state.sudoku.selected)
    const matrix = useSelector(state => state.sudoku.matrix)
    const dispatch = useDispatch()

    const clickHandler = number => {
        if (selected[0] === null || selected[1] === null || matrix[selected[0]][selected[1]].show)
            return
        dispatch(insertNumber({ number: parseInt(number) }))
    }

    return (
        <div style={{ display: "flex", width: "90%" }}>
            {/* <div className={classNames("sudoku-numbers")}> */}
            {Object.keys(numberBalance).map(n => (
                <div key={n} style={{ width: "100%" }}>
                    {/* <div key={n} className={classNames("number-line")}> */}
                    <div
                        className={classNames("one-point", {
                            selected: selected[0] && matrix[selected[0]][selected[1]].number.indexOf(parseInt(n)) >= 0,
                            fill: numberBalance[n] - 9 === 0,
                        })}
                        onClick={_ => clickHandler(n)}
                        id="number"
                    >
                        {n}
                    </div>
                    <div className={classNames("number-text")}>
                        {
                            9 - numberBalance[n] >= 0 ?
                                `Осталось: ${9 - numberBalance[n]}` :
                                `Лишних: ${numberBalance[n] - 9}`
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Numbers
