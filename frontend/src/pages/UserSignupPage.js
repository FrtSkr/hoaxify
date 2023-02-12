import React from "react";
import { signup } from '../api/apiCalls';
import Input from "../components/Input";

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
        errors[name] = undefined

        if (name == 'password' || name == 'passwordRepeat') {
            if (name == 'password' && value != this.state.passwordRepeat) {
                errors.passwordRepeat = "Parola eşleşmiyor";
            } else if (name == 'passwordRepeat' && value != this.state.password) {
                errors.passwordRepeat = "Parola eşleşmiyor";
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

    render() {
        const { pendingApiCall, errors } = this.state;
        const { userName, displayName, password, passwordRepeat } = errors;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input label="User Name" error={userName} inputName="userName" onChange={this.onChange} />
                    <Input label="Display Name" error={displayName} inputName="displayName" onChange={this.onChange} />
                    <Input label="Password" error={password} inputName="password" onChange={this.onChange} inputType="password" />
                    <Input label="Password Repeat" error={passwordRepeat} inputName="passwordRepeat" onChange={this.onChange} inputType="password" />
                    <div className="text-center">
                        <button className="btn btn-primary"
                            onClick={this.onClickSignUp}
                            disabled={pendingApiCall || passwordRepeat != undefined}>
                            {pendingApiCall &&
                                <span className="spinner-border spinner-border-sm"></span>}
                            Sign Up</button>
                    </div>

                </form>
            </div>
        );
    }
}
export default UserSignupPage;