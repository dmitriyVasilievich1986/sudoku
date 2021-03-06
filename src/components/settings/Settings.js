import { updateState } from '../../reducers/sudokuSlice'
import { useSelector, useDispatch } from 'react-redux'
import DificultyLevels from './DificultyLevels'
import Switch from '@material-ui/core/Switch';
import classNames from 'classnames'
import Selector from './Selector'
import React from 'react'
import axios from 'axios'


function Settings() {
    const dificulty = useSelector(state => state.sudoku.dificulty)
    const endGame = useSelector(state => state.sudoku.endGame)
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
                    const newDificulty = data.data.dificulty
                    dispatch(updateState({
                        endGame: newDificulty != dificulty ? true : endGame,
                        dificulty: data.data.dificulty,
                    }))
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
                            <p>??????????????????:</p>
                            <Selector selected={dificulty} values={DificultyLevels} onChange={changeDifficultyHandler} />
                        </div>
                        <div className={classNames("settings-value")}>
                            <p>??????????????????:</p>
                            <Switch checked={help} onChange={changeHelpHandler} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Settings
