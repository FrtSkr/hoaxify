import React from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";
class UserLoginPage extends React.Component {

    state = {
        userName: null,
        password: null,
        errors: {},
        pendingApiCall: false

    }

    onChange = event => {
        const { name, value } = event.target;
        const errors = { ...this.state.errors };
        errors[name] = undefined;
        this.setState({
            [name]: value,
            errors
        });

    }


    onClickLogin = async event => {
        event.preventDefault();

        const { userName, password } = this.state;

        const creds = {
            userName,
            password
        };
        this.setState({ pendingApiCall: true });
        try {
            const response = await login(creds);
        } catch (errors) {

        }
        this.setState({ pendingApiCall: false });

    };


    render() {
        const { userName, password } = this.state.errors;
        const { pendingApiCall } = this.state;
        const { t } = this.props;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Login')}</h1>
                    <Input label={t("Username")} error={userName} inputName="userName" onChange={this.onChange} />
                    <Input label={t("Password")} error={password} inputName="password" onChange={this.onChange} inputType="password" />

                    <div className="text-center">
                        <button className="btn btn-primary"
                            onClick={this.onClickLogin}
                            disabled={pendingApiCall}>
                            {pendingApiCall &&
                                <span className="spinner-border spinner-border-sm"></span>}
                            {t('Login')}</button>
                    </div>
                </form>
            </div>
        );
    };

}
export default withTranslation()(UserLoginPage);