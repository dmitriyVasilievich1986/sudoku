import { configureStore } from '@reduxjs/toolkit'
import sudokuReducer from './reducers/sudokuSlice'

export default configureStore({
    reducer: {
        sudoku: sudokuReducer,
    },
})