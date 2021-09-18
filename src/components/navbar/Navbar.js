import { Link } from "react-router-dom";
import classNames from 'classnames'
import React from 'react'

function Navbar(props) {
    return (
        <div className={classNames("navbar")}>
            <div className={classNames("fl3")} />
            <div className={classNames("fl3", "navbar-main")}>
                <Link className="link" to="/">Главная</Link>
                <Link className="link" to="/settings">Настройки</Link>
            </div>
            <div className={classNames("fl3")} />
        </div>
    )
}

export default Navbar
