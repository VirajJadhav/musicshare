import React, { Component } from 'react'
import { MDBInput, MDBBtn } from "mdbreact"
import { resetPassword } from "./Function"

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            pass1: "",
            pass2: "",
        }
    }
    async componentDidMount() {
        if(localStorage.userEmail) {
            await this.setState({
                email: localStorage.getItem('userEmail')
            })
        }
        else {
            this.props.history.push('/forgotPassword');
        }
    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        if(localStorage.userEmail) {
            if(this.state.pass1 === this.state.pass2) {
                const User = {
                    email: localStorage.getItem('userEmail'),
                    password: this.state.pass1,
                }
                resetPassword(User).then(response => {
                    if(!response.error) {
                        alert('Password Changed !')
                        localStorage.removeItem('userEmail')
                        if(localStorage.usertoken) {
                            localStorage.removeItem('usertoken')
                        }
                        this.props.history.push('/login');
                    }
                    else {
                        alert(response.result)
                    }
                })
                .catch(error => console.log(error.message))
            }
            else {
                alert('Please Check Your Passwords !')
            }
        }
    }
    render() {
        return (
            <div className="mt-4">
                <form onSubmit={this.onSubmit}>
                    <div className="container w-25 py-5">
                        <MDBInput label="Enter New Password" group type="password" name="pass1"  onChange={this.onChange} icon="lock" />
                        <MDBInput label="Please Confirm Your Password" group type="password" name="pass2"  onChange={this.onChange} icon="lock" />
                    </div>
                    <div className="text-center">
                        <MDBBtn color="mdb-color" type="submit" className="text-xs-left">Reset</MDBBtn>
                    </div>
                </form>
            </div>
        )
    }
}

export default ResetPassword;