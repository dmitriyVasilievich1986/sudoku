import React from 'react'

function Options(props) {
    const [selected, updateSelected] = props.selected
    const [lines, updateLines] = props.sudoku
    const [options, updateOptions] = React.useState([])
    React.useEffect(_ => {
        if (selected[0] === null) {
            return
        }
        const newOptions = [...Array(9).keys()].filter(n => {
            let f = true
            lines.map(l => l.map(p => {
                if (
                    (p.position[0] === selected[0] && p.number.indexOf(n + 1) >= 0) ||
                    (p.position[1] === selected[1] && p.number.indexOf(n + 1) >= 0) ||
                    (
                        (
                            p.position[0] !== selected[0] ||
                            p.position[1] !== selected[1]
                        ) && (
                            parseInt(p.position[0] / 3) === parseInt(selected[0] / 3) &&
                            parseInt(p.position[1] / 3) === parseInt(selected[1] / 3) &&
                            p.number.length === 1 &&
                            p.number.indexOf(n + 1) >= 0
                        )
                    )
                ) {
                    f = false
                }
            }))
            return f
        })
        updateOptions(newOptions.map(o => o + 1))
    }, [selected])
    if (selected[0] === null || lines[selected[0]][selected[1]].number.length > 0) {
        return null
    } else if (options.length === 0) {
        return (
            <h3>Нет доступных вариантов</h3>
        )
    }
    return (
        <div style={{ display: "flex" }}>
            <h3>Возможные варианты:</h3>
            {options.map(o => <h3 key={o} style={{ marginLeft: "10px" }}>{o}</h3>)}
        </div>
    )
}

export default Options
