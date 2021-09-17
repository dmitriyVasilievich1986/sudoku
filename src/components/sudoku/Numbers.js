import React from 'react'

function Numbers(props) {
    const [lines, updateLines] = props.sudoku
    const [selected, updateSelected] = props.selected
    const [nums, updateNums] = props.nums
    const clickHandler = n => {
        if (selected[0] === null || lines[selected[0]][selected[1]].show === true) {
            return
        }
        let number = []
        const item = lines[selected[0]][selected[1]]
        if (item.number.indexOf(n) >= 0) {
            number = item.number.filter(i => i !== n)
        } else {
            number = [...item.number, n]
        }
        if (item.number.length === 1) {
            updateNums({ ...nums, [item.number[0]]: nums[item.number[0]] - 1 })
        } else if (item.number.length === 0) {
            updateNums({ ...nums, [n]: nums[n] + 1 })
        } else if (item.number.length === 2 && number.length === 1) {
            updateNums({ ...nums, [number[0]]: nums[number[0]] + 1 })
        }
        const newItem = { ...item, number: number }
        const newLines = lines.map(x => x.map(y => {
            if (y.position[0] === selected[0] && y.position[1] === selected[1]) {
                return newItem
            }
            return { ...y, error: false }
        }))
        updateLines(newLines)
    }
    const getSelected = n => {
        if (
            selected[0] !== null &&
            lines[selected[0]][selected[1]].number.length === 1 &&
            lines[selected[0]][selected[1]].number[0] === n
        ) {
            return "number-selected"
        }
        return ""
    }
    return (
        <div>
            {[...Array(9).keys()].map(c => (
                <div style={{ display: 'flex', alignItems: 'center' }} key={c}>
                    <div>
                        <div
                            id="number"
                            onClick={_ => clickHandler(c + 1)}
                            className={`number ${nums[c + 1] === 9 && "fill"} ${getSelected(c + 1)}`}
                        >
                            {c + 1}
                        </div>
                    </div>
                    <div style={{ flex: "3", marginLeft: '1rem' }}>
                        {9 - nums[c + 1] >= 0 ? `Осталось: ${9 - nums[c + 1]}` : `Лишних: ${nums[c + 1] - 9}`}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Numbers
