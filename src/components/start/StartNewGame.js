import { setMatrix, updateState } from '../../reducers/sudokuSlice'
import { useSelector, useDispatch } from 'react-redux'
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
            <div className={classNames("start-button-wraper")}>
                <button
                    className={classNames("start-button", {
                        disable: endGame || matrix === null,
                    })}
                    disabled={endGame || matrix === null}
                    onClick={continueClickHandler}
                >
                    Продолжить
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
