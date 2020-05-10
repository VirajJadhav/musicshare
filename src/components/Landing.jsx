import React, { Component } from 'react'
import { MDBContainer, MDBJumbotron, MDBCol } from "mdbreact"

class Landing extends Component {
    render() {
        return (
            <MDBContainer>
                <MDBJumbotron className="mt-5">
                    <MDBCol sm={8} className="mx-auto">
                        <h1 className="text-center">Welcome</h1>
                    </MDBCol>
                </MDBJumbotron>
            </MDBContainer>
        )
    }
}

export default Landing;