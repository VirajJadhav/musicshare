import React, { Component } from 'react'
import jwt_decode from "jwt-decode"
import {upload} from "./Function.js"
import { MDBCol, MDBContainer } from "mdbreact"
import ListComponent from "./ListComponent"

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            file: null,
            data: [1, 2, 3, 4]
	    }
    }
    componentDidMount() {
        const decoded = jwt_decode(localStorage.usertoken)
        this.setState({
            first_name: decoded.identity.first_name,
            last_name: decoded.identity.last_name,
            email: decoded.identity.email
        })
    }
    onChange = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append('audio_file', this.state.file)
        const User = { email: this.state.email, audio_file: formData }
        upload(User).then(res => {
            if(res.audio_file) {
                // this.props.history.push('/profile')
            }
        })
        .catch(error => console.log(error.messgae))
    }
    render() {
        return (
            <MDBContainer className="mt-5">
                <MDBCol sm="6" className="mx-auto">
                    <h1 className="text-center">
        {this.state.first_name + " " + this.state.last_name}
                    </h1>
                </MDBCol>
                <MDBCol md="6">
                    <ListComponent data={this.state.data} />
                </MDBCol>
                {/* <input type="file" multiple onChange={this.onChange} name="audio_file" />
                <button onClick={this.onSubmit} type="submit">Submit</button> */}
            </MDBContainer>
        )
    }
}

export default UserProfile;