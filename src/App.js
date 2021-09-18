import { Provider, useDispatch } from 'react-redux'
import { updateState, setMatrix } from './reducers/sudokuSlice'
import StartNewGame from './components/start/StartNewGame'
import SudokuPage from './components/sudoku/SudokuPage'
import reactDOM from 'react-dom'
import React from 'react'
import store from './store'

import {
    BrowserRouter,
    Redirect,
    Switch,
    Route,
} from "react-router-dom";


function App() {
    const dispatch = useDispatch()

    React.useEffect(_ => {
        dispatch(setMatrix())
        document.addEventListener('mousedown', function (e) {
            if (e.target.id !== 'point' && e.target.id !== 'number')
                dispatch(updateState({ selected: [null, null] }))
        })
    }, [])

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/start" component={StartNewGame} />
                <Route exact path="/sudoku" component={SudokuPage} />
                <Redirect to="/start/" />
            </Switch>
        </BrowserRouter>
    )
}

reactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'))