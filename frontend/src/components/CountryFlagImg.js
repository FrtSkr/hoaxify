import React from "react";

const CountryFlagImg = (props) => {
    const { onChangeLanguage } = props;
    return (
        <div>
            <img src="https://flagsapi.com/TR/shiny/24.png" alt="Turkiye Flag" onClick={() => onChangeLanguage("tr")} style={{ cursor: 'pointer' }} />
            <img src="https://flagsapi.com/US/shiny/24.png" alt="USA Flag" onClick={() => onChangeLanguage("en")} style={{ cursor: 'pointer' }} />
        </div>
    );
}

export default CountryFlagImg;