import React from "react";

const Input = (props) => {
    const { error, inputName, label, onChange } = props;
    const className = error ? "form-control is-invalid" : "form-control";
    return (
        <div className="form-group">
            <label>{label}</label>
            <input className={className} name={inputName} onChange={onChange} />
            <div className="invalid-feedback">
                {error}
            </div>

        </div>);
}

export default Input;