import { isError, getCube } from '../../reducers/commonFunctions'
import { useSelector } from 'react-redux'
import React from 'react'
import classNames from 'classnames'

function Options(props) {
    const numberBalance = useSelector(state => state.sudoku.numberBalance)
    const selected = useSelector(state => state.sudoku.selected)
    const matrix = useSelector(state => state.sudoku.matrix)
    const help = useSelector(state => state.sudoku.help)

    const [options, updateOptions] = React.useState([])
    React.useEffect(_ => {
        if (selected[0] === null) {
            return
        }
        const newOptions = Object.keys(numberBalance).filter(n => (
            !isError(getCube(matrix, selected), { position: [null, null], number: [n] }) &&
            !isError(matrix[selected[0]], { position: [null, null], number: [n] }) &&
            !isError(matrix.map(x => x[selected[1]]), { position: [null, null], number: [n] })
        ))
        updateOptions(newOptions)
    }, [selected])
    if (!help || selected[0] === null || matrix[selected[0]][selected[1]].number.length > 0) {
        return null
    } else if (
        options.length === 0
    ) {
        return (
            <div className={classNames("d-flex ml2")}>
                <h3>Нет доступных вариантов</h3>
            </div>
        )
    }
    return (
        <div className={classNames("d-flex ml2")}>
            <h3>Возможные варианты:</h3>
            {options.map(o => <h3 key={o} className={classNames("ml2")}>{o}</h3>)}
        </div>
    )
}

export default Options
