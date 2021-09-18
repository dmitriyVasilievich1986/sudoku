import { checkEndGame, initialState, getNewBalance, getBalance, watchErrors } from './commonFunctions'
import SudokuGenerator from '../components/generator/SudokuGenerator'
import { createSlice } from '@reduxjs/toolkit'


export const sudokuReducer = createSlice({
    initialState: initialState,
    name: 'sudoku',
    reducers: {
        updateState: (state, action) => { return { ...state, ...action.payload } },
        insertNumber: (state, action) => {
            const { number } = action.payload
            const item = state.matrix[state.selected[0]][state.selected[1]]
            const newNumber = item.number.indexOf(number) >= 0 ? item.number.filter(n => n !== number) : [...item.number, number]
            const newItem = { ...item, number: newNumber }
            const newMatrix = state.matrix.map(l => l.map(p => {
                if (p.position[0] === state.selected[0] && p.position[1] === state.selected[1])
                    return newItem
                return p
            }))
            const newBalance = getNewBalance(state.numberBalance, item.number, number)
            const [m, e] = watchErrors(newMatrix)
            const end = checkEndGame(newBalance, e)
            return {
                ...state,
                selected: end ? [null, null] : state.selected,
                numberBalance: newBalance,
                endGame: end,
                matrix: m,
                errors: e,
            }
        },
        setMatrix: (state) => {
            const matrix = SudokuGenerator(state.emptyCount)
            const balance = getBalance()
            matrix.map(l => l.map(p => {
                if (p.number.length > 0)
                    balance[p.number[0]] = balance[p.number[0]] + 1
            }))
            return { ...state, endGame: false, matrix: matrix, numberBalance: balance }
        },
    },
})

export const { updateState, insertNumber, setMatrix } = sudokuReducer.actions

export default sudokuReducer.reducer