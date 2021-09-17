import SudokuGenerator from './components/generator/SudokuGenerator'
import Line from './components/sudoku/Line'
import { Provider } from 'react-redux'
import reactDOM from 'react-dom'
import React from 'react'
import Numbers from './components/sudoku/Numbers'
import Options from './components/sudoku/Options'
import store from './store'
import StartNewGame from './components/start/StartNewGame'
import SudokuPage from './components/sudoku/SudokuPage'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";

function App() {
    // const [lines, updateLines] = React.useState(null)
    // const [selected, updateSelected] = React.useState([null, null])
    // const [nums, updateNums] = React.useState(getObject())
    // React.useEffect(_ => {
    //     document.addEventListener('mousedown', function (e) {
    //         // console.log(e.target.id)
    //         e.preventDefault()
    //         if (e.target.id !== 'point' && e.target.id !== 'number') {
    //             updateSelected([null, null])
    //         }
    //     })
    //     const newLines = SudokuGenerator()
    //     const newNums = getObject()
    //     updateLines(newLines)
    //     newLines.map(l => l.map(p => {
    //         if (p.number.length > 0) {
    //             newNums[p.number] = newNums[p.number[0]] + 1 || 1
    //         }
    //     }))
    //     updateNums(newNums)
    // }, [])

    // if (lines === null) {
    //     return <h1>Loading...</h1>
    // }

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