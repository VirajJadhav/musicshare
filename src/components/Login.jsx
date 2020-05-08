import React, { Component } from 'react'
import {login} from "./Function"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    onchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        login(user).then(res => {
            if(!res.error) {
                this.props.history.push('/profile')
            }
        })
    }
    render() {
        return (
            <div className="container">
                <div className="col-md-6 mt-5 mx-auto">
                    <form noValidate onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">
                            Please Sign In
                        </h1>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter Email"
                            value={this.state.email}
                            onChange={this.onchange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Password</label>
                            <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.onchange}
                            />
                        </div>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;