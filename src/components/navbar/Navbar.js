import { useSelector, useDispatch } from 'react-redux'
import { updateState } from '../../reducers/sudokuSlice'
import { Link } from "react-router-dom"
import React, { useState } from 'react'
import logoutPNG from './logout.png'
import classNames from 'classnames'
import IUser from '../account/User'
import axios from 'axios'

function Navbar(props) {
    const token = useSelector(state => state.sudoku.token)
    const user = useSelector(state => state.sudoku.user)
    const dispatch = useDispatch()

    React.useEffect(_ => {
        if (token !== null) {
            const headers = { Authorization: `token ${token}` }
            axios.get(`${process.env.REACT_APP_API_URL}`, { headers: headers })
                .then(data => {
                    const S = JSON.parse(data.data?.sudoku_cube || "null")
                    const user = IUser(data.data)
                    if (S) {
                        dispatch(updateState({
                            dificulty: parseInt(data.data.dificulty),
                            numberBalance: S.numberBalance,
                            timer: data.data.timer,
                            help: data.data.help,
                            endGame: S.endGame,
                            matrix: S.matrix,
                            user: user,
                        }))
                    } else {
                        dispatch(updateState({
                            user: user,
                        }))
                    }
                })
                .catch(err => console.log(err))
        }
    }, [token])

    const getUser = _ => {
        if (user === null) {
            return <Link className={classNames("link", "m2")} to="/login">Войти</Link>
        }
        return (
            <div className={classNames("row", "m2")}>
                <Link className="link" to="/account">
                    {user.username}
                </Link>
                <img src={logoutPNG} onClick={logoutHandler} className={classNames("login-icon")} />
            </div>
        )
    }

    const logoutHandler = _ => {
        const headers = { Authorization: `token ${token}` }
        axios.get(`${process.env.REACT_APP_API_URL}logout/`, { headers: headers })
            .then(_ => {
                localStorage.removeItem("token")
                dispatch(updateState({ user: null, token: null }))
            })
            .catch(err => console.log(err.message))
    }

    return (
        <div className={classNames("navbar")}>
            <div className={classNames("navbar-main")}>
                <Link className={classNames("link", "m2")} to="/">Главная</Link>
                <Link className={classNames("link", "m2")} to="/settings">Настройки</Link>
                {getUser()}
            </div>
        </div>
    )
}

export default Navbar
