import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { loginHandler } from "../redux/authActions";
// import { Authentication } from "../shared/AuthenticationContext";

const UserLoginPage = props => {
    //    static contextType = Authentication;

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setError(undefined);
    }, [username, password]);

    const onClickLogin = async event => {
        event.preventDefault();
        const { dispatch, history } = props;
        const { push } = history;

        const creds = {
            username,
            password
        };
        setError(undefined);
        try {
            await dispatch(loginHandler(creds));
            push('/');

        } catch (apiError) {
            setError(apiError.response.data.message);
        }
    };

    const { t, pendingApiCall } = props;
    const isBtnEnable = username && password;
    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t('Login')}</h1>
                <Input label={t("Username")} inputName="username" onChange={event => setUsername(event.target.value)} />
                <Input label={t("Password")} inputName="password" onChange={event => setPassword(event.target.value)} inputType="password" />
                <br />
                {error && <div className="alert alert-danger">
                    {error}
                </div>}
                <div className="text-center">
                    <ButtonWithProgress
                        onClick={onClickLogin}
                        disabled={pendingApiCall || !isBtnEnable}
                        pendingApiCall={pendingApiCall}
                        text={t('Login')}

                    />

                </div>
            </form>
        </div>
    );

}
const UserSignupPageWithApiProgress = withApiProgress(UserLoginPage, "/api/1.0/auth")
const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgress)


export default connect()(UserSignupPageWithTranslation);