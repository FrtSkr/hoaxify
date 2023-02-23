import React from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";
import axios from "axios";
import ButtonWithProgress from '../components/ButtonWithProgress';


class UserLoginPage extends React.Component {

    state = {
        username: null,
        password: null,
        error: null,
        pendingApiCall: false

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
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            error: null
        });

    }


    onClickLogin = async event => {
        event.preventDefault();

        const { username, password } = this.state;

        const creds = {
            username,
            password
        };
        this.setState({ error: null });
        try {
            await login(creds);
        } catch (apiError) {
            this.setState({
                error: apiError.response.data.message
            });
        }
    };


    render() {
        const { pendingApiCall, username, password, error } = this.state;
        const { t } = this.props;
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
export default withTranslation()(UserLoginPage);