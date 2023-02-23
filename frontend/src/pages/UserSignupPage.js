import React from "react";
import { signup, changeLanguage } from '../api/apiCalls';
import Input from "../components/Input";
import { withTranslation } from 'react-i18next';
import ButtonWithProgress from "../components/ButtonWithProgress";
import axios from "axios";

class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    };

    componentDidMount() {
        axios.interceptors.request.use(request => {
            this.setState({
                pendingApiCall: true
            });
            return request;
        });

        axios.interceptors.response.use(response => {
            this.setState({
                pendingApiCall: false
            });
            return response;
        }, error => {
            this.setState({
                pendingApiCall: false
            });
            throw error;
        });
    }

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

        const { username, displayName, password } = this.state;

        const body = {
            username,
            displayName,
            password
        };

        try {
            const response = await signup(body);

        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({
                    errors: error.response.data.validationErrors
                });
            }
        }


    };

    render() {
        const { pendingApiCall, errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        const { t } = this.props;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input label={t("Username")} error={username} inputName="username" onChange={this.onChange} />
                    <Input label={t("Display Name")} error={displayName} inputName="displayName" onChange={this.onChange} />
                    <Input label={t("Password")} error={password} inputName="password" onChange={this.onChange} inputType="password" />
                    <Input label={t("Password Repeat")} error={passwordRepeat} inputName="passwordRepeat" onChange={this.onChange} inputType="password" />
                    <br />
                    <div className="text-center">
                        <ButtonWithProgress
                            onClick={this.onClickSignUp}
                            disabled={pendingApiCall || passwordRepeat != undefined}
                            text={t('Sign Up')}
                            pendingApiCall={pendingApiCall} />
                    </div>
                </form>
            </div>
        );
    }
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);

export default UserSignupPageWithTranslation;