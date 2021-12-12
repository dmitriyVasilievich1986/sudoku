function shuffle(list) {
    const newList = []
    for (let x = 0; x < list.length; x++) {
        while (true) {
            const i = Math.floor(Math.random() * list.length)
            if (newList.indexOf(list[i]) < 0) {
                newList.push(list[i])
                break
            }
        }
    }
    return newList
}

function pattern(r, c) {
    return (3 * (r % 3) + parseInt(r / 3) + c) % 9
}

function setEmpty(list, emptyCount) {
    const empty = shuffle([...Array(81).keys()]).slice(0, emptyCount)
    empty.map(p => {
        const x = parseInt(p / 9)
        const y = p - x * 9
        list[x][y < 9 ? y : 8].show = false
        list[x][y < 9 ? y : 8].number = []
    })
}

function getList() {
    const rBase = [...Array(3).keys()]
    const list = []
    shuffle(rBase).map(r => shuffle(rBase).map(g => list.push(g * 3 + r)))
    return list
}

function SudokuGenerator(emptyCount) {
    const rows = getList()
    const cols = getList()
    const nums = shuffle([...Array(9).keys()].map(x => x + 1))
    const list = rows.map(r => cols.map(c => nums[pattern(r, c)]))
    const sudokuFields = list.map((l, li) => l.map((p, pi) => {
        return {
            position: [li, pi],
            error: false,
            number: [p],
            show: true,
        }
    }))
    setEmpty(sudokuFields, emptyCount)
    return sudokuFields
}

export default SudokuGenerator
