import { useHistory, Redirect } from "react-router-dom"
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
        return <Redirect to='start' />
    return (
        <div>
            <div className={classNames("sudoku-wraper")}>
                <div className={classNames("fl3")} />
                <div className={classNames("fl2")}>
                    <div className={classNames("sudoku-cube")}>
                        <div>
                            {matrix.map((l, i) => (
                                <Line line={l} key={i} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={classNames("fl2")}>
                    <Numbers />
                </div>
                <div className={classNames("fl3")} />
            </div>
            <div className={classNames("sudoku-wraper")}>
                <div className={classNames("fl3")} />
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
                <div className={classNames("fl3")} />
            </div>
        </div>
    )
}

export default SudokuPage
