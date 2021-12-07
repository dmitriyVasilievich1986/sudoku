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
                            help: data.data.help,
                            endGame: S.endGame,
                            matrix: S.matrix,
                            timer: S.timer,
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
            return <Link className="link" to="/login">Войти</Link>
        }
        return (
            <div style={{ display: "flex" }}>
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
            <div className={classNames("fl3")} />
            <div className={classNames("fl3", "navbar-main")}>
                <Link className="link" to="/">Главная</Link>
                <Link className="link" to="/settings">Настройки</Link>
                {getUser()}
            </div>
            <div className={classNames("fl3")} />
        </div>
    )
}

export default Navbar
