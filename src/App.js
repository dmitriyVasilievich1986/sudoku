import { Account, Navbar, SudokuPage, Settings, StartNewGame, Login } from './components'
import { updateState } from './reducers/sudokuSlice'
import { Provider, useDispatch } from 'react-redux'
import reactDOM from 'react-dom'
import store from './store'
import React from 'react'

import {
    BrowserRouter,
    Redirect,
    Switch,
    Route,
} from "react-router-dom";


function App() {
    const dispatch = useDispatch()

    React.useEffect(_ => {
        document.title = process.env.REACT_APP_NAME
        document.addEventListener('mousedown', function (e) {
            if (e.target.id !== 'point' && e.target.id !== 'number')
                dispatch(updateState({ selected: [null, null] }))
        })
    }, [])

    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/start" component={StartNewGame} />
                <Route exact path="/sudoku" component={SudokuPage} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/login" component={Login} />
                <Redirect to="/start/" />
            </Switch>
        </BrowserRouter>
    )
}

reactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'))