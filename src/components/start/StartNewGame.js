import { useSelector, useDispatch } from 'react-redux'
import { setMatrix } from '../../reducers/sudokuSlice'
import { useHistory } from "react-router-dom"
import classNames from 'classnames'
import React from 'react'


function StartNewGame(props) {
    const endGame = useSelector(state => state.sudoku.endGame)
    const dispatch = useDispatch()
    const history = useHistory()

    const newGameClickHandler = _ => {
        dispatch(setMatrix())
        history.push('/sudoku')
    }
    const continueClickHandler = _ => {
        history.push('/sudoku')
    }
    return (
        <div className={classNames("new-start-wraper")}>
            <div>
                <div>
                    <button
                        className={classNames("start-button", {
                            disable: endGame,
                        })}
                        onClick={continueClickHandler}
                        disabled={endGame}
                    >
                        Продолжить игру
                    </button>
                </div>
                <div className={classNames("mt2")}>
                    <button
                        className={classNames("start-button")}
                        onClick={newGameClickHandler}
                    >
                        Новая игра
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StartNewGame
