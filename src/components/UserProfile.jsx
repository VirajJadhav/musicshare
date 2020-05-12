import React, { Component } from 'react'
import jwt_decode from "jwt-decode"
import {upload} from "./Function.js"
import { MDBCol, MDBContainer, MDBRow } from "mdbreact"
import ListComponent from "./DesignComponents/ListComponent"
import axios from "axios"
import { Button } from "react-bootstrap"
import { Input } from '@material-ui/core'
import SweetAlert from "react-bootstrap-sweetalert";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            alertValue: "",
            alertTitle: "",
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
    handleAlertCanel = () => {
        this.setState({
            open: false
        })
    }
    showStatusList = (value) => {
        let list = []
        this.state.songStatus.forEach((status, index) => {
            if(status === value.split(' ')[0]) {
                list.push(this.state.songName[index])
                list.push(<br key={index} />)
            }
        })
        this.setState({
            alertTitle: value,
            alertValue: list.length !== 0 ? list : "No " + value,
            open: true
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
            <div>
                <div>
                    <SweetAlert
                        show={this.state.open}
                        title={this.state.alertTitle}
                        onConfirm={this.handleAlertCanel}
                        customButtons={
                            <React.Fragment>
                                <Button
                                    className="aqua-gradient-rgba"
                                    style={{ borderRadius: '20%' }}
                                    onClick={() => {
                                        this.handleAlertCanel();
                                    }}
                                >
                                    Okay
                                </Button>
                            </React.Fragment>
                        }
                    >
                        {this.state.alertValue}
                    </SweetAlert>
                </div>
                <div className="mt-4">
                <h1 className="text-center">
                    Welcome,
    {" " + this.state.first_name}
                </h1>
                {/* <h1>Your Songs</h1> */}
                <MDBContainer >
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBRow>
                                <Button onClick={this.handleFile} variant="outline-primary">Select Music</Button>
                                <Input value={this.state.fileValue} />
                            </MDBRow>
                            <MDBRow className="container ml-auto pl-5">
                                <input type="file" onChange={this.onChange} hidden id="music" name="audio_file" />
                                <Button onClick={this.onSubmit} type="submit">Upload Music</Button>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBCol className="d-flex justify-content-between" md="12">
                                <Button onClick={() => this.showStatusList('Private Songs')} variant="info">Private Songs</Button>
                                <Button onClick={() => this.showStatusList('Public Songs')} variant="secondary">Public Songs</Button>
                            </MDBCol>
                            <ListComponent history={this.props.history} email={this.state.email} songName={this.state.songName} songStatus={this.state.songStatus} />
                        <div className="gcse-search"></div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </div>
            </div>
        )
    }
}

export default UserProfile;