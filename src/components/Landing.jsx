import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { MDBView, MDBMask, MDBIcon } from "mdbreact"

class Landing extends Component {
    render() {
        return (
            <div>
                <MDBView src={require('../home.jpg')}>
                    <MDBMask overlay="stylish-strong" className="text-white text-center">
                        <div className="py-5 py-5">
                            <h1>Welcome to Music Share</h1>
                            <h5>Listen and share music with your friends</h5>
                            <br />
                            <p>“Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.”</p>
                        </div>
                        <div className="mt-4">
                            <p className="font-weight-bolder" style={{ fontSize: '1.6rem' }}>Log In, to Music Share <Link style={{color: 'white'}} to="/login"><MDBIcon size="1x" icon="sign-in-alt" /></Link></p>
                            <p className="font-weight-bolder" style={{ fontSize: '1.6rem' }}>New to Music Share ? <Link style={{color: 'white'}} to="/register">Register Here <MDBIcon size="1x" icon="user-plus" /></Link></p>
                        </div>
                    </MDBMask>
                </MDBView>
            </div>
        )
    }
}

export default Landing;