import React from "react";
import axios from "axios"; // for http requests
import { signup } from '../api/apiCalls';

class UserSignupPage extends React.Component {

    state = {
        userName: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false
    };

    onChange = event => {
        //object destructuring
        const { name, value } = event.target;
        this.setState({
            [name]: value
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

        }
        this.setState({ pendingApiCall: false })


    };

    render() {
        const { pendingApiCall } = this.state;
        return (
            <div className="container">
                <form>
                    <h1 className="text-center">Sign Up</h1>
                    <div className="form-group">
                        <label>User Name: </label>
                        <input className="form-control" name="userName" onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label>Display Name: </label>
                        <input className="form-control" name="displayName" onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
                        <input className="form-control" name="password" type="password" onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <label>Password Repeat: </label>
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