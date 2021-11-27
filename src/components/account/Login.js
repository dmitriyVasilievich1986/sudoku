import { updateState } from '../../reducers/sudokuSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";
import classNames from 'classnames'
import React from 'react'
import axios from 'axios'


function Login(props) {
    const [password, updatePassword] = React.useState("")
    const user = useSelector(state => state.sudoku.user)
    const [login, updateLogin] = React.useState("")
    const dispatch = useDispatch()

    React.useEffect(_ => {
        window.addEventListener('keydown', keyDownHandler)
        return _ => window.removeEventListener("keydown", keyDownHandler)
    }, [])

    const keyDownHandler = e => {
        if (e.key == "Enter") {
            loginHandler()
        }
    }

    const loginHandler = _ => {
        const data = {
            password: password,
            login: login,
        }
        axios.post("/api/account/login/", { data: data })
            .then(data => {
                const token = data.data.token
                localStorage.setItem("token", token)
                dispatch(updateState({ token: token }))
            })
            .catch(err => console.log(err.message))
    }

    if (user !== null) {
        return <Redirect to="/" />
    }
    return (
        <div className={classNames("settings-window")}>
            <div className={classNames("settings-wraper")}>
                <div className={classNames("settings-inner-box")}>
                    <div className={classNames("login-row")}>
                        <p>Логин:</p>
                        <input type="text" placeholder="логин" value={login} onChange={e => updateLogin(e.target.value)} />
                    </div>
                    <div className={classNames("login-row")}>
                        <p>Пароль:</p>
                        <input type="text" placeholder="пароль" value={password} onChange={e => updatePassword(e.target.value)} />
                    </div>
                </div>
                <div className={classNames("login-button")}>
                    <button onClick={loginHandler} className={classNames("login")}>
                        войти
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Login
