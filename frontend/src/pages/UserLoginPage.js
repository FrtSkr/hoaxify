import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { loginHandler } from "../redux/authActions";

const UserLoginPage = props => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        setError(undefined);
    }, [username, password]);

    const onClickLogin = async event => {
        event.preventDefault();
        const { history } = props;
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

    const pendingApiCall = useApiProgress('post', '/api/1.0/auth');
    const { t } = useTranslation();
    const isBtnEnable = username && password;
    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t('Login')}</h1>
                <Input label={t("Username")} onChange={event => setUsername(event.target.value)} />
                <Input label={t("Password")} onChange={event => setPassword(event.target.value)} type="password" />
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



export default UserLoginPage;