import { updateTimer } from '../../reducers/sudokuSlice'
import { useHistory, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import Numbers from './Numbers'
import Options from './Options'
import React from 'react'
import Line from './Line'
import axios from 'axios'

function SudokuPage(props) {
    const numberBalance = useSelector(state => state.sudoku.numberBalance)
    const dificulty = useSelector(state => state.sudoku.dificulty)
    const endGame = useSelector(state => state.sudoku.endGame)
    const matrix = useSelector(state => state.sudoku.matrix)
    const timer = useSelector(state => state.sudoku.timer)
    const token = useSelector(state => state.sudoku.token)
    const user = useSelector(state => state.sudoku.user)
    const dispatch = useDispatch()
    const history = useHistory()

    React.useEffect(_ => {
        if (user !== null) {
            const sudoku_cube = {
                matrix: matrix, endGame: endGame, numberBalance: numberBalance,
            }
            const data = { sudoku_cube: JSON.stringify(sudoku_cube) }
            const headers = { Authorization: `token ${token}` }
            axios.patch(`${process.env.REACT_APP_API_URL}${user.id}/`, data, { headers: headers })
                .catch(e => console.log(e))
        }
    }, [matrix, timer])

    React.useEffect(_ => {
        if (!endGame) {
            const intervalId = setInterval(() => {
                if (user) {
                    const data = { timer: timer }
                    const headers = { Authorization: `token ${token}` }
                    axios.patch(`${process.env.REACT_APP_API_URL}${user.id}/`, data, { headers: headers })
                        .catch(e => console.log(e))
                }
                dispatch(updateTimer())
            }, 1000);

            return _ => clearInterval(intervalId)
        }
    }, [timer])

    React.useEffect(_ => {
        if (endGame) {
            const data = { dificulty: dificulty, timer: timer }
            const headers = { Authorization: `token ${token}` }
            axios.post(`${process.env.REACT_APP_API_URL}account/history/`, data, { headers: headers })
                .catch(e => console.log(e))
        }
    }, [endGame])

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
        <div className={classNames("sudoku-page")}>
            <div className={classNames("sudoku-wraper")}>
                <div className={classNames("timer")}>
                    Таймер: {getTimer()}
                </div>
                <div>
                    {matrix.map((l, i) => (
                        <Line line={l} key={i} />
                    ))}
                </div>
                <div className={classNames("sudoku-page-line")}>
                    <Numbers />
                </div>
                <div className={classNames("sudoku-page-line")} style={{ height: "80px" }}>
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
        </div>
    )
}

export default SudokuPage
