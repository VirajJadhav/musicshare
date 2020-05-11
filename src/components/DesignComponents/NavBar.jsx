import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import { Navbar, Nav } from "react-bootstrap"

class NavBar extends Component {
    logOut = (event) => {
        event.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }
    render() {
        const loginRegLink = (
            <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">User</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
        )
        const userLink = (
            <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/profile">User</Nav.Link>
                <Nav.Link href="#logout" onClick={this.logOut}>Log Out</Nav.Link>
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