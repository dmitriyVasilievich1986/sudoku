import { updateState } from '../../reducers/sudokuSlice'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import Selector from './Selector'
import React from 'react'
import axios from 'axios'

import Switch from '@material-ui/core/Switch';

const difficultLevels = [
    { value: "20", text: "Легкий", },
    { value: "40", text: "Средний", },
    { value: "50", text: "Тяжелый", },
    { value: "60", text: "Максимальный", },
]
if (process.env.NODE_ENV) {
    difficultLevels.push({ value: "1", text: "Тест" })
}

function Settings() {
    const dificulty = useSelector(state => state.sudoku.dificulty)
    const token = useSelector(state => state.sudoku.token)
    const help = useSelector(state => state.sudoku.help)
    const user = useSelector(state => state.sudoku.user)
    const dispatch = useDispatch()

    const changeDifficultyHandler = v => {
        const data = { dificulty: v }
        if (user) {
            const headers = { Authorization: `token ${token}` }
            axios.patch(`${process.env.REACT_APP_API_URL}${user.id}/`, data, { headers: headers })
                .then(data => {
                    dispatch(updateState({ dificulty: data.data.dificulty }))
                })
                .catch(e => console.log(e))
        } else {
            dispatch(updateState(data))
        }
    }

    const changeHelpHandler = _ => {
        const data = { help: !help }
        if (user) {
            const headers = { Authorization: `token ${token}` }
            axios.patch(`${process.env.REACT_APP_API_URL}${user.id}/`, data, { headers: headers })
                .then(data => {
                    dispatch(updateState({ help: data.data.help }))
                })
                .catch(e => console.log(e))
        } else {
            dispatch(updateState(data))
        }
    }

    return (
        <div className={classNames("settings-window")}>
            <div className={classNames("settings-wraper")}>
                <div className={classNames("settings-inner-box")}>
                    <div style={{ minHeight: "250px" }}>
                        <div className={classNames("settings-value")}>
                            <p>Сложность:</p>
                            <Selector selected={dificulty} values={difficultLevels} onChange={changeDifficultyHandler} />
                        </div>
                        <div className={classNames("settings-value")}>
                            <p>Подсказки:</p>
                            <Switch checked={help} onChange={changeHelpHandler} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Settings
