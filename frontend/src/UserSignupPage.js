import React from "react";
import axios from "axios"; // for http requests

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


    onClickSignUp = event => {
        event.preventDefault();
        const url = '/api/1.0/users'
        const { userName, displayName, password } = this.state;

        const body = {
            userName,
            displayName,
            password
        };

        this.setState({ pendingApiCall: true });

        axios.post(url, body)
            .then(response => {
                this.setState({ pendingApiCall: false });
            })
            .catch(error => {
                this.setState({ pendingApiCall: false });
            });

    };

    render() {
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
                            disabled={this.state.pendingApiCall}>
                            {this.state.pendingApiCall &&
                                <span className="spinner-border spinner-border-sm"></span>}
                            Sign Up</button>
                    </div>

                </form>
            </div>
        );
    }
}
export default UserSignupPage;