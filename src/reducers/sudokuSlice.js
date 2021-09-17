import { initialState, getNewBalance } from './commonFunctions'
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
            state.matrix = getNewBalance(newMatrix, item.number, number)
        }
    },
})

export const { updateState, insertNumber } = sudokuReducer.actions

export default sudokuReducer.reducer