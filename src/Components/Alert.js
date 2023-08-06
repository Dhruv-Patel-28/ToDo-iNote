import React from 'react'

function Alert(props) {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{ height: '50px' }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.msg)}</strong> 
            </div>}
        </div>

        /* In line 5, if 'props.alert' is false then further execution is not done. If 'proos.alert' is true(has some value except null) then further execution of code(code that is after '&&') takes place */
    )
}

export default Alert;