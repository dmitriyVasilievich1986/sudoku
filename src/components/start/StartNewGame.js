import { setMatrix, updateState } from '../../reducers/sudokuSlice'
import DificultyLevels from '../settings/DificultyLevels'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import classNames from 'classnames'
import React from 'react'


function StartNewGame(props) {
    const dificulty = useSelector(state => state.sudoku.dificulty)
    const endGame = useSelector(state => state.sudoku.endGame)
    const matrix = useSelector(state => state.sudoku.matrix)
    const timer = useSelector(state => state.sudoku.timer)
    const user = useSelector(state => state.sudoku.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const newGameClickHandler = _ => {
        dispatch(updateState({ timer: 0 }))
        dispatch(setMatrix())
        history.push('/sudoku')
    }

    const getDificulty = _ => {
        const dificultyObject = DificultyLevels.filter(d => d.value == dificulty)[0]
        return dificultyObject.text
    }
    const getBestTime = _ => {
        const bestTime = parseInt(user.history[dificulty])
        if (bestTime == 0) {
            return "Нет"
        }
        let min = parseInt(bestTime / 60)
        min = min <= 99 ? String(min) : String(99)
        let sec = String(bestTime - min * 60)
        sec = sec <= 59 ? String(sec) : String(59)
        const T = `${min.padStart(2, 0)}:${sec.padStart(2, 0)}`
        return T
    }

    const getTimer = _ => {
        if (!timer) {
            return null
        }
        let min = parseInt(timer / 60)
        min = min <= 99 ? String(min) : String(99)
        let sec = String(timer - min * 60)
        sec = sec <= 59 ? String(sec) : String(59)
        const T = `${min.padStart(2, 0)}:${sec.padStart(2, 0)}`
        return T
    }

    const continueClickHandler = _ => {
        history.push('/sudoku')
    }
    return (
        <div className={classNames("new-start-wraper")}>
            <div className={classNames("start-button-wraper")}>
                <div className={classNames("history-wraper")}>
                    <div className={classNames("history-row")}>
                        <p>Уровень сложности:</p>
                        <div style={{ display: "flex", justifyContent: "end", width: "150px" }}>
                            <p>"{getDificulty()}"</p>
                        </div>
                    </div>
                    {user && (
                        <div className={classNames("history-row")}>
                            <p>Лучшее время на данной сложности:</p>
                            <div style={{ display: "flex", justifyContent: "end", width: "150px" }}>
                                <p>"{getBestTime()}"</p>
                            </div>
                        </div>
                    )}
                </div>
                <button
                    className={classNames("start-button", {
                        disable: endGame || matrix === null,
                    })}
                    disabled={endGame || matrix === null}
                    onClick={continueClickHandler}
                >
                    Продолжить {getTimer()}
                </button>
                <button
                    className={classNames("start-button")}
                    onClick={newGameClickHandler}
                >
                    Новая игра
                </button>
            </div>
        </div>
    )
}

export default StartNewGame
