import { updateState, updateTimer } from '../../reducers/sudokuSlice'
import { useHistory, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import Numbers from './Numbers'
import Options from './Options'
import React from 'react'
import Line from './Line'

function SudokuPage(props) {
    const endGame = useSelector(state => state.sudoku.endGame)
    const matrix = useSelector(state => state.sudoku.matrix)
    const timer = useSelector(state => state.sudoku.timer)
    const dispatch = useDispatch()
    const history = useHistory()

    React.useEffect(_ => {
        if (!endGame) {
            const intervalId = setInterval(() => {
                dispatch(updateTimer())
            }, 1000);

            return _ => clearInterval(intervalId)
        }
    }, [timer])

    const clickHandler = _ => {
        history.push('/start')
    }

    const getTimer = _ => {
        let min = parseInt(timer / 60)
        min = min <= 99 ? String(min) : String(99)
        let sec = String(timer - min * 60)
        sec = sec <= 59 ? String(sec) : String(59)
        const T = `${min.padStart(2, 0)}:${sec.padStart(2, 0)}`
        return T
    }

    if (matrix === null)
        return <Redirect to='start' />
    return (
        <div className={classNames("sudoku-wraper")}>
            <div className={classNames("sudoku-cube")}>
                <div className={classNames("timer")}>
                    Таймер: {getTimer()}
                </div>
            </div>
            <div className={classNames("sudoku-cube")}>
                <div>
                    {matrix.map((l, i) => (
                        <Line line={l} key={i} />
                    ))}
                </div>
            </div>
            <div className={classNames("sudoku-cube")}>
                <Numbers />
            </div>
            <div className={classNames("sudoku-cube")}>
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
