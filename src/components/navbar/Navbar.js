import React from 'react'
import { Link } from "react-router-dom";

function Navbar(props) {
    return (
        <div
            style={{
                height: "80px",
                marginBottom: "2rem",
                backgroundColor: "#03045e",
                display: "flex",
                alignItems: "center",
            }}>
            <div className="fl3" />
            <div className="fl3" style={{ display: "flex", justifyContent: "space-between" }}>
                <Link className="link" to="/">Главная</Link>
                <Link className="link" to="/settings">Настройки</Link>
            </div>
            <div className="fl3" />
        </div>
    )
}

export default Navbar
