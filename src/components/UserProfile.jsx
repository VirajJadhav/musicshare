import React, { Component } from 'react'
import jwt_decode from "jwt-decode"
import {upload} from "./Function.js"
import { MDBCol, MDBContainer, MDBRow } from "mdbreact"
import ListComponent from "./DesignComponents/ListComponent"
import axios from "axios"
import { Button } from "react-bootstrap"
import { Input } from '@material-ui/core'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            file: null,
            songName: [],
            songStatus: [],
            fileValue: ""
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
                    songName: res.data.songName,
                    songStatus: res.data.songStatus
                })
            })
            .catch(error => console.log(error.message))
    }
    onChange = (event) => {
        this.setState({
            file: event.target.files[0],
            fileValue: event.target.files[0].name
        })
    }
    handleFile = () => {
        const check = document.getElementById('music')
        check.click();
    }
    onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData()
        formData.append('audio_file', this.state.file)
        const User = { email: this.state.email, audio_file: formData, status: "Private" }
        upload(User).then(res => {
            if(!res.error) {
                window.location.reload();
            }
            else if(res.error) {
                alert(res.result)
            }
        })
        .catch(error => console.log(error.messgae))
    }
    render() {
        return (
            <div className="mt-4">
            <h1 className="text-center">
                Welcome,
{" " + this.state.first_name}
            </h1>
            {/* <h1>Your Songs</h1> */}
            <MDBContainer >
                <MDBRow>
                <MDBCol sm="6">
                    <MDBRow>
                        <Button onClick={this.handleFile} variant="outline-primary">Select Music</Button>
                        <Input value={this.state.fileValue} />
                    </MDBRow>
                    <MDBRow>
                        <input type="file" onChange={this.onChange} hidden id="music" name="audio_file" />
                        <Button onClick={this.onSubmit} type="submit">Upload Music</Button>
                    </MDBRow>
                </MDBCol>
                <MDBCol md="6">
                    <MDBCol className="d-flex justify-content-between" md="12">
                        <Button variant="info">Private Songs</Button>
                        <Button variant="secondary">Public Songs</Button>
                    </MDBCol>
                    <ListComponent history={this.props.history} email={this.state.email} songName={this.state.songName} songStatus={this.state.songStatus} />
                </MDBCol>
                </MDBRow>
            </MDBContainer>
            </div>
        )
    }
}

export default UserProfile;