import SudokuGenerator from '../components/generator/SudokuGenerator'


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

export const initialState = {
    numberBalance: getBalance(),
    matrix: SudokuGenerator(),
    selected: [null, null],
}