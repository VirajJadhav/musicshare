import React, { Component } from 'react'
import jwt_decode from "jwt-decode"
import {upload, deleteSong} from "./Function.js"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBIcon, MDBBtn, MDBCardTitle } from "mdbreact"
import ListComponent from "./DesignComponents/ListComponent"
import axios from "axios"
import { Button, Form } from "react-bootstrap"
import { Input } from '@material-ui/core'
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from 'react-router-dom'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            deleteOpen: false,
            deleteSong: "",
            alertValue: "",
            alertTitle: "",
            first_name: "",
            last_name: "",
            email: "",
            file: null,
            songName: [],
            songStatus: [],
            fileValue: "",
            hiddenFields: true,
	    }
    }
    async componentDidMount() {
        if(localStorage.usertoken) {
            const decoded = jwt_decode(localStorage.usertoken)
            this.setState({
                first_name: decoded.identity.first_name,
                last_name: decoded.identity.last_name,
                email: decoded.identity.email,
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
        else {
            this.props.history.push('/')
        }
    }
    onChange = (event) => {
        this.setState({
            file: event.target.files[0],
            fileValue: event.target.files[0].name,
            hiddenFields: false,
        })
    }
    onChangeSelect = (event) => {
        this.setState({
            deleteSong: event.target.value
        })
    }
    showSelectDelete = () => {
        return (
            <Form>
                <Form.Group controlId="deleteSongs">
                    <Form.Control as="select" onChange={this.onChangeSelect} size="lg" custom>
                        <option value="disabled">Choose a Song</option>
                        {this.state.songName.map((songs, index) => {
                            return (
                                <option key={index} value={songs}>{songs}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>
            </Form>
        )
    }
    handleDeleteCancel = () => {
        this.setState({
            deleteOpen: false
        })
    }
    handleDelete = () => {
        this.setState({
            deleteOpen: true
        })
    }
    deleteSong = () => {
        if(this.state.deleteSong !== "") {
            const User = { email: this.state.email, songName: this.state.deleteSong }
            deleteSong(User).then(response => {
                if(!response.error) {
                    window.location.reload()
                }
            })
            .catch(error => console.log(error.message))
        }
        else {
            alert('Please Select a song')
        }
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
                    <SweetAlert
                        show={this.state.deleteOpen}
                        title="Select Song"
                        onConfirm={this.handleDeleteCancel}
                        customButtons={
                            <React.Fragment>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        this.deleteSong();                 
                                        this.handleDeleteCancel();
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button variant="dark" onClick={this.handleDeleteCancel}>Cancel</Button>
                            </React.Fragment>
                        }
                    >
                     {this.showSelectDelete()}
                    </SweetAlert>
                </div>
                <div className="mt-4">
                <h1 className="text-center">
                    Welcome,
    {" " + this.state.first_name}
                </h1>
                <MDBContainer >
                    <MDBRow>
                        <MDBCol md="6">
                            <MDBRow>
                                <MDBCard
                                    className='card-image'
                                    style={{
                                        backgroundImage:
                                        "url('https://mdbootstrap.com/img/Others/documentation/img%20(7)-mini.jpg')"
                                    }}
                                >
                                <div className='text-white text-center d-flex align-items-center rgba-black-strong py-5 px-4'>
                                    <div>
                                    <h5 className='pink-text'>
                                        <MDBIcon icon='headphones' /> Songs <MDBIcon icon='headphones' />
                                    </h5>
                                    <MDBCardTitle tag='h3' className='pt-2'>
                                        <strong>Friend's Playlist <MDBIcon icon="record-vinyl" /></strong>
                                    </MDBCardTitle>
                                    <p>
                                    Words make you think. Music makes you feel. A song makes you feel a thought.
                                        Check what songs your friends are listening to !
                                    </p>
                                    <Link style={{ color: 'white' }} to="/friendfeed">
                                        <MDBBtn color='pink'>
                                            Check Out
                                        </MDBBtn>
                                    </Link>
                                    </div>
                                </div>
                                </MDBCard>
                            </MDBRow>
                            <MDBRow className="container mt-1">
                                <Button className="mx-auto" onClick={this.handleFile} variant="outline-primary">Select Your Music<MDBIcon icon="music" className="ml-2" /></Button>
                                <Input hidden={this.state.hiddenFields} value={this.state.fileValue} />
                            </MDBRow>
                            <MDBRow className="container">
                                <input type="file" onChange={this.onChange} hidden id="music" name="audio_file" />
                                <Button hidden={this.state.hiddenFields}  className="mx-auto" onClick={this.onSubmit} type="submit">Upload<MDBIcon icon="upload" className="ml-2" /></Button>
                            </MDBRow>
                        </MDBCol>
                        <MDBCol md="6">
                            <MDBCol className="d-flex justify-content-between" md="12">
                                <Button onClick={() => this.showStatusList('Private Songs')} variant="info">Private Songs</Button>
                                <Button size="sm" onClick={this.handleDelete} variant="outline-danger">Delete Song</Button>
                                <Button onClick={() => this.showStatusList('Public Songs')} variant="secondary">Public Songs</Button>
                            </MDBCol>
                            <ListComponent history={this.props.history} email={this.state.email} songName={this.state.songName} songStatus={this.state.songStatus} />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </div>
            </div>
        )
    }
}

export default UserProfile;