import React from "react";

const Input = (props) => {
    const { error, inputName, label, onChange, inputType } = props;
    const className = error ? "form-control is-invalid" : "form-control";
    const type = inputType ? inputType : "text";
    return (
        <div className="form-group">
            <label>{label}</label>
            <input className={className} name={inputName} onChange={onChange} type={type} />
            <div className="invalid-feedback">
                {error}
            </div>

        </div>);
}

export default Input;