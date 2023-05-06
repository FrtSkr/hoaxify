import React from "react";

const ButtonWithProgress = (props) => {

    const { onClick, pendingApiCall, disabled, text, className, icon, style } = props;
    const defineClassName = className || "btn btn-primary";
    return (

        <button className={defineClassName}
            onClick={onClick}
            disabled={disabled}>
            {pendingApiCall &&
                <span className="spinner-border spinner-border-sm"></span>}
            {text}
        </button>
    );
};

export default ButtonWithProgress;