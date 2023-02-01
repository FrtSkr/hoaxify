import React from "react";
import axios from "axios"; // for http requests

class UserSignupPage extends React.Component {

    state = {
        userName: null,
        displayName: null,
        password: null,
        passwordRepeat: null
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
        }
        axios.post(url, body);

    };

    render() {
        return (
            <form>
                <h1>Sign Up</h1>
                <div>
                    <label>User Name: </label>
                    <input name="userName" onChange={this.onChange} />
                </div>

                <div>
                    <label>Display Name: </label>
                    <input name="displayName" onChange={this.onChange} />
                </div>

                <div>
                    <label>Password: </label>
                    <input name="password" type="password" onChange={this.onChange} />
                </div>

                <div>
                    <label>Password Repeat: </label>
                    <input name="passwordRepeat" type="password" onChange={this.onChange} />
                </div>

                <button onClick={this.onClickSignUp}>Sign Up</button>
            </form>
        );
    }
}
export default UserSignupPage;