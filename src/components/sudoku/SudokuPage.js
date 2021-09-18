import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import Numbers from './Numbers'
import Options from './Options'
import React from 'react'
import Line from './Line'

function SudokuPage(props) {
    const endGame = useSelector(state => state.sudoku.endGame)
    const matrix = useSelector(state => state.sudoku.matrix)
    const history = useHistory()

    const clickHandler = _ => {
        history.push('/start')
    }

    if (matrix === null)
        return <h1>Loading...</h1>
    return (
        <div>
            <div className={classNames("sudoku-wraper")}>
                <div className={classNames("fl2")} />
                <div className={classNames("fl3")}>
                    {matrix.map((l, i) => (
                        <Line
                            className={classNames("one-line")}
                            line={l}
                            key={i}
                        />
                    ))}
                </div>
                <div className={classNames("fl3")}>
                    <Numbers />
                </div>
                <div className={classNames("fl3")} />
            </div>
            <div className={classNames("option-wraper")}>
                <Options />
                {
                    endGame &&
                    <button
                        className={classNames("start-button")}
                        onClick={clickHandler}
                    >
                        Завершить игру
                    </button>
                }
            </div>
        </div>
    )
}

export default SudokuPage
