import React from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from "../shared/ApiProgress";


class UserLoginPage extends React.Component {

    state = {
        username: null,
        password: null,
        error: null

    };

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: null
        });

    }


    onClickLogin = async event => {
        event.preventDefault();

        const { username, password } = this.state;
        const { push } = this.props.history;
        const creds = {
            username,
            password
        };
        this.setState({ error: null });
        try {
            await login(creds);
            push('/')
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            });
        }
    };


    render() {
        const { username, password, error } = this.state;
        const { t, pendingApiCall } = this.props;
        const isBtnEnable = username && password;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">{t('Login')}</h1>
                    <Input label={t("Username")} inputName="username" onChange={this.onChange} />
                    <Input label={t("Password")} inputName="password" onChange={this.onChange} inputType="password" />
                    <br />
                    {error && <div className="alert alert-danger">
                        {error}
                    </div>}
                    <div className="text-center">
                        <ButtonWithProgress
                            onClick={this.onClickLogin}
                            disabled={pendingApiCall || !isBtnEnable}
                            pendingApiCall={pendingApiCall}
                            text={t('Login')}

                        />

                    </div>
                </form>
            </div>
        );
    };

}
const UserSignupPageWithApiProgress = withApiProgress(UserLoginPage, "/api/1.0/auth")
const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgress)
export default UserSignupPageWithTranslation;