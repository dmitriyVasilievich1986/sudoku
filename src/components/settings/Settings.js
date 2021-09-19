import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { updateState } from '../../reducers/sudokuSlice'
import React from 'react'

import Switch from '@material-ui/core/Switch';


function Settings() {
    const emptyCount = useSelector(state => state.sudoku.emptyCount)
    const help = useSelector(state => state.sudoku.help)
    const dispatch = useDispatch()

    const changeDifficultyHandler = e => {
        dispatch(updateState({ emptyCount: e.target.value }))
    }

    const changeHelpHandler = _ => {
        dispatch(updateState({ help: !help }))
    }

    return (
        <div className={classNames("settings-window")}>
            <div className={classNames("settings-wraper")}>
                <div className={classNames("settings-value")}>
                    <p>Сложность:</p>
                    <select value={emptyCount} onChange={changeDifficultyHandler}>
                        <option value="1">Тест</option>
                        <option value="20">Легко</option>
                        <option value="40">Средне</option>
                        <option value="60">Тяжело</option>
                    </select>
                </div>
                <div className={classNames("settings-value")}>
                    <p>Подсказки:</p>
                    <Switch checked={help} onChange={changeHelpHandler} />
                </div>
            </div>
        </div >
    )
}

export default Settings
