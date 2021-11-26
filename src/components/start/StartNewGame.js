import { useSelector, useDispatch } from 'react-redux'
import { setMatrix, updateState } from '../../reducers/sudokuSlice'
import { useHistory } from "react-router-dom"
import classNames from 'classnames'
import React from 'react'


function StartNewGame(props) {
    const endGame = useSelector(state => state.sudoku.endGame)
    const matrix = useSelector(state => state.sudoku.matrix)
    const dispatch = useDispatch()
    const history = useHistory()

    const newGameClickHandler = _ => {
        dispatch(updateState({ timer: 0 }))
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
                            disable: endGame || matrix === null,
                        })}
                        onClick={continueClickHandler}
                        disabled={endGame || matrix === null}
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
