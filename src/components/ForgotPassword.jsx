import React, { Component } from 'react'
import { MDBInput, MDBBtn } from "mdbreact"
import { sendMail } from "./Function"

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }
    }
    async componentDidMount() {
        if(localStorage.userEmail) {
            alert('Please check mail box for password Reset.')
            this.props.history.push('/')
        }
    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        if(this.state.email !== "") {
            sendMail({ email: this.state.email }).then(response => {
                if(response.error) {
                    alert(response.result)
                }
                else {
                    alert(response.result)
                    localStorage.setItem('userEmail', this.state.email)
                }
            })
        }
        else {
            alert('Please Fill email field')
        }
    }
    render() {
        return (
            <div className="mt-4">
                <div className="container-sm w-25 py-5">
                    <form onSubmit={this.onSubmit}>
                        <MDBInput label="Enter Your Email" group type="email" icon="envelope" name="email" id="email" onChange={this.onChange} validate />
                        <div className="text-center">
                            <MDBBtn color="mdb-color" type="submit" className="text-xs-left">Send Mail</MDBBtn>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;