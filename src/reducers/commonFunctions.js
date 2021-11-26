export function getBalance() {
    const obj = {}
    for (let x = 1; x < 10; x++)
        obj[x] = 0
    return obj
}

export function getNewBalance(balance, oldNumber, newNumber) {
    switch (oldNumber.length) {
        case 0:
        case 2:
            return { ...balance, [newNumber]: balance[newNumber] + 1 }
        case 1:
            return { ...balance, [oldNumber[0]]: balance[oldNumber[0]] - 1 }
        default:
            return balance
    }
}

export function isError(list, number) {
    let error = false
    list.map(x => {
        if (x.position[0] !== number.position[0] || x.position[1] !== number.position[1]) {
            if (x.number.length === 1 && x.number[0] == number.number[0])
                error = true
        }
    })
    return error
}

export function getCube(matrix, pos) {
    const cube = []
    matrix.map(l => l.map(p => {
        if (
            p.number.length === 1 &&
            parseInt(p.position[0] / 3) === parseInt(pos[0] / 3) &&
            parseInt(p.position[1] / 3) === parseInt(pos[1] / 3)
        )
            cube.push(p)
    }))
    return cube
}

export function watchErrors(matrix) {
    let errorNumber = 0
    const newMatrix = matrix.map(l => l.map(p => {
        if (p.number.length !== 1)
            return { ...p, error: false }
        const e = (
            isError(getCube(matrix, p.position), p) ||
            isError(matrix[p.position[0]], p) ||
            isError(matrix.map(x => x[p.position[1]]), p)
        )
        errorNumber = e ? errorNumber + 1 : errorNumber
        return { ...p, error: e }
    }))
    return [newMatrix, errorNumber]
}

export function checkEndGame(balance, errors) {
    let sum = 0
    Object.values(balance).map(x => sum += x)
    return errors === 0 && sum === 81
}

export const initialState = {
    emptyCount: parseInt(process.env.REACT_APP_GENERATOR_END),
    selected: [null, null],
    numberBalance: null,
    endGame: false,
    matrix: null,
    help: true,
    errors: 0,
    timer: 0,
}