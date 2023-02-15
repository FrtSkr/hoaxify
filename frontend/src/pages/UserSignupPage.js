import React from "react";
import { signup, changeLanguage } from '../api/apiCalls';
import Input from "../components/Input";
import { withTranslation, WithTranslation } from 'react-i18next';
import CountryFlagImg from "../components/CountryFlagImg";
class UserSignupPage extends React.Component {

    state = {
        userName: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    };

    onChange = event => {
        //object destructuring
        const { name, value } = event.target;
        const errors = { ...this.state.errors }
        const { t } = this.props;
        errors[name] = undefined

        if (name == 'password' || name == 'passwordRepeat') {
            if (name == 'password' && value != this.state.passwordRepeat) {
                errors.passwordRepeat = t("Password missmatch");
            } else if (name == 'passwordRepeat' && value != this.state.password) {
                errors.passwordRepeat = t("Password missmatch");
            } else {
                errors.passwordRepeat = undefined;
            }
        }

        this.setState({
            [name]: value,
            errors
        });
    }


    onClickSignUp = async event => {
        event.preventDefault();

        const { userName, displayName, password } = this.state;

        const body = {
            userName,
            displayName,
            password
        };

        this.setState({ pendingApiCall: true });
        try {
            const response = await signup(body);

        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({
                    errors: error.response.data.validationErrors
                });
            }
        }
        this.setState({ pendingApiCall: false })


    };

    onChangeLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    render() {
        const { pendingApiCall, errors } = this.state;
        const { userName, displayName, password, passwordRepeat } = errors;
        const { t } = this.props;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input label={t("Username")} error={userName} inputName="userName" onChange={this.onChange} />
                    <Input label={t("Display Name")} error={displayName} inputName="displayName" onChange={this.onChange} />
                    <Input label={t("Password")} error={password} inputName="password" onChange={this.onChange} inputType="password" />
                    <Input label={t("Password Repeat")} error={passwordRepeat} inputName="passwordRepeat" onChange={this.onChange} inputType="password" />
                    <div className="text-center">
                        <button className="btn btn-primary"
                            onClick={this.onClickSignUp}
                            disabled={pendingApiCall || passwordRepeat != undefined}>
                            {pendingApiCall &&
                                <span className="spinner-border spinner-border-sm"></span>}
                            {t('Sign Up')}</button>
                    </div>
                </form>
                <CountryFlagImg onChangeLanguage={this.onChangeLanguage} />
            </div>
        );
    }
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);

export default UserSignupPageWithTranslation;