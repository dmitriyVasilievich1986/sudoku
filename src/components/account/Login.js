import { updateState } from '../../reducers/sudokuSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from "react-router-dom";
import InputComponent from './InputComponent'
import classNames from 'classnames'
import React from 'react'
import axios from 'axios'


function Login(props) {
    const [PasswordError, updatePasswordError] = React.useState("")
    const [loginError, updateLoginError] = React.useState("")
    const [password, updatePassword] = React.useState("")
    const user = useSelector(state => state.sudoku.user)
    const [login, updateLogin] = React.useState("")
    const dispatch = useDispatch()

    const checkEmptyInput = _ => {
        password === "" && updatePasswordError("*заполните поле")
        login === "" && updateLoginError("*заполните поле")
        return password === "" || login === ""
    }

    const loginHandler = _ => {
        if (checkEmptyInput()) {
            return
        }
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
            .catch(err => {
                updatePasswordError("*неверные данные")
                updateLoginError("*неверные данные")
            })
    }

    const onChangeHandler = (func, value) => {
        updatePasswordError("")
        updateLoginError("")
        func(value)
    }

    if (user !== null) {
        return <Redirect to="/" />
    }
    return (
        <div className={classNames("settings-window")}>
            <div className={classNames("settings-wraper")}>
                <div className={classNames("settings-inner-box")}>
                    <div>
                        <InputComponent
                            onChange={e => onChangeHandler(updateLogin, e.target.value)}
                            error={loginError}
                            value={login}
                            text="Логин"
                        />
                        <InputComponent
                            onChange={e => onChangeHandler(updatePassword, e.target.value)}
                            error={PasswordError}
                            value={password}
                            text="Пароль"
                        />
                    </div>
                </div>
                <div className={classNames("login-button")}>
                    <button onClick={loginHandler} className={classNames("login")}>
                        войти
                    </button>
                </div>
                <div className={classNames("account-link")}>
                    <p className={classNames("mr1")}>Если нет аккаунта, то можете его</p>
                    <Link className={classNames("setting-link")} to="/create">создать.</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
