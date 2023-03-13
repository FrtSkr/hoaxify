import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { withTranslation } from 'react-i18next';
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { signupHandler } from "../redux/authActions";
import { connect } from "react-redux";

const UserSignupPage = props => {
    const [form, setForm] = useState({
        username: undefined,
        displayName: undefined,
        password: undefined,
        passwordRepeat: undefined
    });
    const [errors, setErrors] = useState({});


    const onChange = event => {
        const { name, value } = event.target;
        setErrors((previousError) => ({ ...previousError, [name]: undefined }));
        setForm((previousForm) => ({ ...previousForm, [name]: value }));

    }


    const onClickSignUp = async event => {
        event.preventDefault();
        const { username, displayName, password } = form;
        const { dispatch, history } = props;
        const { push } = history;

        const body = {
            username,
            displayName,
            password
        };

        try {
            await dispatch(signupHandler(body));
            push('/');
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors);
            }
        }


    };

    const { username: usernameError, displayName: displayNameError, password: passwordError } = errors;
    const { t, pendingApiCall } = props;

    let passwordRepeatError;
    if (form.password != form.passwordRepeat) {
        passwordRepeatError = t('Password mismatch');
    }
    console.log(passwordRepeatError);
    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t('Sign Up')}</h1>
                <Input label={t("Username")} error={usernameError} inputName="username" onChange={event => onChange(event)} />
                <Input label={t("Display Name")} error={displayNameError} inputName="displayName" onChange={event => onChange(event)} />
                <Input label={t("Password")} error={passwordError} inputName="password" onChange={event => onChange(event)} inputType="password" />
                <Input label={t("Password Repeat")} error={passwordRepeatError} inputName="passwordRepeat" onChange={event => onChange(event)} inputType="password" />
                <br />
                <div className="text-center">
                    <ButtonWithProgress
                        onClick={onClickSignUp}
                        disabled={pendingApiCall || passwordRepeatError != undefined}
                        text={t('Sign Up')}
                        pendingApiCall={pendingApiCall} />
                </div>
            </form>
        </div>
    );
}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);
const UserSignupPageWithApiProgressForSignupRequest = withApiProgress(UserSignupPageWithTranslation, "/api/1.0/users");
const UserSignupPageWithApiProgressForAuthRequest = withApiProgress(UserSignupPageWithApiProgressForSignupRequest, "/api/1.0/auth");
export default connect()(UserSignupPageWithApiProgressForAuthRequest);