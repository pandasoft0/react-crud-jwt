import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

export interface LoginProps {
    login: (userData: Object) => any;
}

class Login extends Component<LoginProps> {

    state = {
        email: "",
        password: "",
        haserror: false,
        errors: {
            email: "",
            password: ""
        },
        err_email : "",
        err_password: "",
    }

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var userData = {
            email: this.state.email,
            password: this.state.password,
        }

        if(this.state.email == "" || !(new RegExp(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/).test(this.state.email)) || this.state.password === ""){
            return;
        }
    
        this.props.login(userData);
    };

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state.errors);
        //Email Validation
        if (this.state.email === "") {
            this.setState({err_email : 'Email field is required'});
        } else if (!(new RegExp(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/).test(this.state.email))) {
            this.setState({err_email :'Invalid Email'});
        } else {
            this.setState({err_email :''});
        }
        //Password Validation
        if (this.state.password === "") {
            this.setState({err_password :'Password field is required.'});
        } else {
            this.setState({err_password :''});            
        }
    };

    render() {
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <h1>Login</h1>
                    <div className="row">
                        <div className = "col-25">
                            <label>Email :</label>
                        </div>
                        <div className = "col-75">
                            <input type="text"
                                className="textInput"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange} />
                            <br />
                            {this.state.err_email == "" ? '' : <div className="error">{this.state.err_email}</div>}
                        </div>
                    </div>
                    <div className="row">
                        <div className = "col-25">
                            <label>Password :</label>
                        </div>
                        <div className = "col-75">
                            <input type="password"
                                className="textInput"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange} />
                            <br />
                            {this.state.err_password == "" ? '' : <div className="error">{this.state.err_password}</div>}
                        </div>
                    </div>
                    <div className="Remember">
                        Remember me : <input type="checkbox" />
                    </div>
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default connect(
    null,
    { login }
)(Login);
