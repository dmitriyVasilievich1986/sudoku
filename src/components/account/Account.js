import { updateState } from '../../reducers/sudokuSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";
import classNames from 'classnames'
import IUser from './User'
import axios from 'axios'
import React from 'react'

function Account(props) {
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
        axios.patch('/api/account/', { data: data })
            .then(data => {
                const user = IUser(data.data)
                dispatch(updateState({ user: user }))
            })
    }

    if (user === null) {
        return <Redirect to="/" />
    }
    return (
        <div className={classNames("settings-window")}>
            <div className={classNames("settings-wraper")}>
                <div className={classNames("settings-inner-box")}>
                    <div className={classNames("login-row")}>
                        <p>Имя:</p>
                        <input type="text" placeholder="имя" value={name} onChange={e => updateName(e.target.value)} />
                    </div>
                    <div className={classNames("login-row")}>
                        <p>Фамилия:</p>
                        <input type="text" placeholder="Фамилия" value={surname} onChange={e => updateSurname(e.target.value)} />
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
