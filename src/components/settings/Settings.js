import { updateState } from '../../reducers/sudokuSlice'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import Selector from './Selector'
import React from 'react'

import Switch from '@material-ui/core/Switch';

const difficultLevels = [
    { value: "1", text: "Тест", },
    { value: "20", text: "Легкий", },
    { value: "40", text: "Средний", },
    { value: "60", text: "Тяжелый", },
]

function Settings() {
    const emptyCount = useSelector(state => state.sudoku.emptyCount)
    const help = useSelector(state => state.sudoku.help)
    const dispatch = useDispatch()

    const changeDifficultyHandler = v => {
        localStorage.setItem("emptyCount", v)
        dispatch(updateState({ emptyCount: v }))
    }

    const changeHelpHandler = _ => {
        localStorage.setItem("help", !help)
        dispatch(updateState({ help: !help }))
    }

    return (
        <div className={classNames("settings-window")}>
            <div className={classNames("settings-wraper")}>
                <div className={classNames("settings-value")}>
                    <p>Сложность:</p>
                    <Selector selected={emptyCount} values={difficultLevels} onChange={changeDifficultyHandler} />
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
