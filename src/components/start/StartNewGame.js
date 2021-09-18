import { useSelector, useDispatch } from 'react-redux'
import { setMatrix } from '../../reducers/sudokuSlice'
import { useHistory } from "react-router-dom"
import classNames from 'classnames'
import React from 'react'


function StartNewGame(props) {
    const endGame = useSelector(state => state.sudoku.endGame)
    const dispatch = useDispatch()
    const history = useHistory()

    React.useEffect(_ => {
        dispatch(setMatrix())
    }, [endGame])

    const clickHandler = _ => {
        if (!endGame)
            history.push('/sudoku')
    }
    return (
        <div className={classNames("new-start-wraper")}>
            <div>
                <button
                    className={classNames("start-button")}
                    onClick={clickHandler}
                >
                    Новая игра
                </button>
            </div>
        </div>
    )
}

export default StartNewGame
