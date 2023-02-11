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
        const { userName, displayName } = errors;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <Input label="User Name" error={userName} inputName="userName" onChange={this.onChange} />
                    <Input label="Display Name" error={displayName} inputName="displayName" onChange={this.onChange} />

                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" name="password" type="password" onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label>Password Repeat</label>
                        <input className="form-control" name="passwordRepeat" type="password" onChange={this.onChange} />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary"
                            onClick={this.onClickSignUp}
                            disabled={pendingApiCall}>
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