import React, { Component } from 'react'
import {register} from "./Function"

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
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
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }
        register(user).then(response => {
            if(response.error) {
                alert(response.result)
            }
            else {
                alert(response.result)
                this.props.history.push('/login')
            }
        })
    }
    render() {
        return (
            <div className="container">
                <div className="col-md-6 mt-5 mx-auto">
                    <form noValidate onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">
                            Register
                        </h1>
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            placeholder="Enter First Name"
                            value={this.state.first_name}
                            onChange={this.onchange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            placeholder="Enter Last Name"
                            value={this.state.last_name}
                            onChange={this.onchange}
                            />
                        </div>
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
                            <label htmlFor="password">Password</label>
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
                            Register
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;