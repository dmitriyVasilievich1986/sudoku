import classNames from 'classnames'
import React from 'react'

function InputComponent(props) {
    return (
        <div className={classNames("login-row")}>
            <p>{props.text}:</p>
            <div className={classNames("input-component")}>
                <input type="text" placeholder={props.text.toLocaleLowerCase()} value={props.value} onChange={props.onChange} />
                <label>{props.error}</label>
            </div>
        </div>
    )
}

export default InputComponent
