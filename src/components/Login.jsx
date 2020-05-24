import React, { Component } from 'react'
import {login} from "./Function"
import { MDBContainer, MDBEdgeHeader, MDBFreeBird, MDBRow, MDBCol, MDBCardTitle, MDBInput, MDBBtn, MDBCardBody, MDBIcon } from "mdbreact"
import { Link } from 'react-router-dom';

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
        if(this.state.email === "" || this.state.password === "") {
            alert('Fields are empty !')
        }
        else {
            const user = {
                email: this.state.email,
                password: this.state.password
            }
            login(user).then(response => {
                if(response.error) {
                    alert(response.result)
                }
                else {
                    this.props.history.push('/profile')
                }
            })
        }
    }
    render() {
        return (
            <MDBContainer className="mt-3">
            <MDBEdgeHeader color="mdb-color" className=""></MDBEdgeHeader>
            <MDBFreeBird>
            <MDBRow>
                <MDBCol md="8" lg="7" className="mx-auto float-none white z-depth-1 py-2 px-2">
                <MDBCardBody>
                    <MDBCardTitle className="text-center">Log In</MDBCardTitle>
                    <form noValidate onSubmit={this.onSubmit}>
                        <MDBInput label="Email" group type="email" icon="envelope" name="email" onChange={this.onchange} validate />
                        <MDBInput label="Password" group type="password" name="password"  onChange={this.onchange} icon="lock" />
                        <div className="text-center">
                            <MDBBtn color="mdb-color" type="submit" className="text-xs-left">Submit <MDBIcon className="ml-2" icon="paper-plane" /></MDBBtn>
                            <p className="mt-2"><Link style={{ fontSize: '1.3rem' }} to="/forgotPassword">Forgot Password ?</Link></p>
                        </div>
                    </form>
                </MDBCardBody>
                </MDBCol>
            </MDBRow>
            </MDBFreeBird>
        </MDBContainer>
        )
    }
}

export default Login;