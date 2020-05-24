import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"
import jwt_decode from "jwt-decode"
import { MDBIcon } from "mdbreact"

class NavBar extends Component {
    logOut = (event) => {
        event.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }
    render() {
        let decoded = "";
        if(localStorage.usertoken) {
            decoded = jwt_decode(localStorage.usertoken)
        }
        const loginRegLink = (
            <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Log In</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
        )
        const userLink = (
            <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/findfriend">Find Friends</Nav.Link>
                <Nav.Link href="/profile">{localStorage.usertoken ? decoded.identity.first_name : "User"} <MDBIcon className="ml-1" icon="user" /></Nav.Link>
                <Nav.Link href="#logout" onClick={this.logOut}>Log Out</Nav.Link>
                {/* <Nav.Link href="/deleteProfile">Delete Account</Nav.Link> */}
            </Nav>
        )
        return (
            <Navbar sticky="top" collapseOnSelect expand="md" bg="dark" variant="dark">
                <Navbar.Brand href="/">Music Share</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {localStorage.usertoken ? userLink : loginRegLink}
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(NavBar);