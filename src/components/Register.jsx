import React, { Component } from 'react'
import {register} from "./Function"
import { MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBInput, MDBBtn, MDBCardBody, MDBIcon } from "mdbreact"

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
        const { first_name, last_name, email, password } = this.state
        if(first_name === "" || last_name === "" || email === "" || password === "") {
            alert('Fields are empty !')
        }
        else {
            const user = {
                first_name,
                last_name,
                email,
                password
            }
            register(user).then(response => {
                if(response !== undefined) {
                    if(response.error) {
                        alert(response.result)
                    }
                    else {
                        alert(response.result)
                        this.props.history.push('/login')
                    }
                }
            })
        }
    }
    render() {
        return (
            <MDBContainer className="my-4 py-4">
                <MDBRow>
                    <MDBCol md="6" className="mx-auto float-none white z-depth-1 py-2 px-2">
                        <MDBCardBody>
                            <MDBCardTitle className="text-center">Sign Up</MDBCardTitle>
                            <form noValidate onSubmit={this.onSubmit}>
                                <MDBInput label="First Name" group type="text" icon="user" name="first_name" onChange={this.onchange} />
                                <MDBInput label="Last Name" group type="text" icon="user" name="last_name" onChange={this.onchange} />
                                <MDBInput label="Email" group type="email" icon="envelope" name="email" onChange={this.onchange} validate />
                                <MDBInput label="Password" group type="password" name="password"  onChange={this.onchange} icon="lock" />
                                <div className="text-center">
                                    <MDBBtn color="mdb-color" type="submit" className="text-xs-left">Register<MDBIcon className="ml-2" icon="user-plus" /></MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Register;