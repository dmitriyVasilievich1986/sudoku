import { updateState } from '../../reducers/sudokuSlice'
import { useDispatch, useSelector } from 'react-redux'
import InputComponent from './InputComponent'
import { Redirect } from "react-router-dom"
import classNames from 'classnames'
import IUser from './User'
import axios from 'axios'
import React from 'react'

function Account(props) {
    const [surnameError, updateSurnameError] = React.useState("")
    const [nameError, updateNameError] = React.useState("")
    const token = useSelector(state => state.sudoku.token)
    const user = useSelector(state => state.sudoku.user)
    const [surname, updateSurname] = React.useState("")
    const [name, updateName] = React.useState("")
    const dispatch = useDispatch()

    React.useEffect(_ => {
        window.addEventListener('keydown', keyDownHandler)
        return _ => window.removeEventListener("keydown", keyDownHandler)
    }, [])

    const keyDownHandler = e => {
        if (e.key == "Enter") {
            updateAccountHandler()
        }
    }

    const updateAccountHandler = _ => {
        const data = {
            token: `token ${token}`,
            surname: surname,
            name: name,
        }
        axios.patch('/api/account/', data)
            .then(data => {
                const user = IUser(data.data)
                dispatch(updateState({ user: user }))
            })
    }

    const onChangeHandler = (func, value) => {
        updateSurnameError("")
        updateNameError("")
        func(value)
    }

    if (user === null) {
        return <Redirect to="/" />
    }
    return (
        <div className={classNames("settings-window")}>
            <div className={classNames("settings-wraper")}>
                <div className={classNames("settings-inner-box")}>
                    <div>
                        <InputComponent
                            onChange={e => onChangeHandler(updateName, e.target.value)}
                            error={nameError}
                            value={name}
                            text="Имя"
                        />
                        <InputComponent
                            onChange={e => onChangeHandler(updateSurname, e.target.value)}
                            error={surnameError}
                            value={surname}
                            text="Фамилия"
                        />
                    </div>
                </div>
                <div className={classNames("login-button")}>
                    <button onClick={updateAccountHandler} className={classNames("login")}>
                        сохранить
                    </button>
                </div>
            </div>
        </div >
    )
}

export default Account
