import React from "react";

const Input = (props) => {
    const { error, inputName, label, onChange, type, defaultValue } = props;
    let className = "form-control";
    if (type == 'file') {
        className += '-file';
    }
    if (error != undefined) {
        className += ' is-invalid';
    }
    return (
        <div className="form-group">
            <label>{label}</label>
            <input className={className} name={inputName} onChange={onChange} type={type} defaultValue={defaultValue} />
            <div className="invalid-feedback">
                {error}
            </div>

        </div>);
}

export default Input;