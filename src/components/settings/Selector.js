import classNames from 'classnames'
import React from 'react'


function Selector(props) {
    const [show, updateShow] = React.useState(false)
    const selectorRef = React.useRef(null)
    const selected = props.values.filter(s => s.value == props.selected)[0]

    React.useEffect(_ => {
        document.addEventListener('click', clickOutsideHandler)
        return _ => document.removeEventListener('click', clickOutsideHandler)
    }, [selectorRef])

    const clickOutsideHandler = e => {
        if (selectorRef.current && !selectorRef.current.contains(e.target)) {
            updateShow(false)
        }
    }

    return (
        <div style={{ position: "relative" }}>
            <div className={classNames("selector")} onClick={_ => { updateShow(!show) }} ref={selectorRef}>
                <p>{selected.text}</p>
            </div>
            <div className={classNames("selector-field", { "d-none": !show })}>
                {props.values.map(v => (
                    <div key={v.value} className={classNames("selector-line")} onClick={_ => props.onChange(v.value)}>
                        <p style={{ width: "100%" }}>{v.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Selector
