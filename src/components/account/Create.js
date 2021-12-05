import { updateState } from '../../reducers/sudokuSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from "react-router-dom"
import InputComponent from './InputComponent'
import classNames from 'classnames'
import axios from 'axios'
import React from 'react'

function Create() {
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

    const createHandler = _ => {
        if (checkEmptyInput()) {
            return
        }
        const data = {
            password: password,
            username: login,
        }
        axios.post('/api/account/', { data: data })
            .then(data => {
                const token = data.data.token
                localStorage.setItem("token", token)
                dispatch(updateState({ token: token }))
            })
            .catch(_ => {
                updateLoginError("*логин уже занят")
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
                    <button onClick={createHandler} className={classNames("login")}>
                        создать
                    </button>
                </div>
                <div className={classNames("account-link")}>
                    <p className={classNames("mr1")}>Уже есть аккаунт?</p>
                    <Link className={classNames("setting-link")} to="/login">войдите.</Link>
                </div>
            </div>
        </div>
    )
}

export default Create
