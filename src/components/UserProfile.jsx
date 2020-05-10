import React, { Component } from 'react'
import jwt_decode from "jwt-decode"
import {upload} from "./Function.js"
import { MDBCol, MDBContainer } from "mdbreact"
import ListComponent from "./ListComponent"
import axios from "axios"

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            file: null,
            data: []
	    }
    }
    async componentDidMount() {
        const decoded = jwt_decode(localStorage.usertoken)
        this.setState({
            first_name: decoded.identity.first_name,
            last_name: decoded.identity.last_name,
            email: decoded.identity.email
        })
        await axios.post('users/getAudioName/', {email: decoded.identity.email})
            .then(res => {
                this.setState({
                    data: res.data.songName
                })
            })
            .catch(error => console.log(error.message))
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
                window.location.reload();
            }
        })
        .catch(error => console.log(error.messgae))
    }
    render() {
        return (
            <div className="mt-4">
            <h1 className="text-center">
{this.state.first_name + " " + this.state.last_name}
            </h1>
            <MDBContainer >
                <MDBCol sm="6">
            <input type="file" multiple onChange={this.onChange} name="audio_file" />
            <button onClick={this.onSubmit} type="submit">Submit</button>
                </MDBCol>
                <MDBCol md="6">
                    <ListComponent email={this.state.email} data={this.state.data} />
                </MDBCol>
            </MDBContainer>
            </div>
        )
    }
}

export default UserProfile;