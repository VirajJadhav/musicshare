import React, { Component } from 'react'
import jwt_decode from "jwt-decode"
import { removeFriend } from "./Function"
import DefaultList from "./DesignComponents/DefaultList"
import { Button, Form, Spinner } from "react-bootstrap"
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios"

class FriendFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            friends: {},
            data: [],
            loading: true,
            deleteOpen: false,
            deleteFriend: "",
        }
    }
    async componentDidMount() {
        if(localStorage.usertoken) {
            const decoded = jwt_decode(localStorage.usertoken)
            await axios.post('users/getFriendsData/', { email: decoded.identity.email })
                .then(response => {
                    const data = []
                    for(let i = 1; i <= Object.keys(response.data).length; i++) {
                        data.push(response.data['friend' + i])
                    }
                    this.setState({
                        email: decoded.identity.email,
                        data,
                        friends: response.data,
                        loading: false
                    })
                })
                .catch(error => console.log(error.message))
        }
        else {
            this.props.history.push('/')
        }
    }
    handleDelete = () => {
        this.setState({
            deleteOpen: true,
        })
    }
    handleDeleteCancel = () => {
        this.setState({
            deleteOpen: false,
        })
    }
    onChangeSelect = (event) => {
        this.setState({
            deleteFriend: event.target.value
        })
    }
    showSelectDelete = () => {
        return (
            <Form>
                <Form.Group controlId="deleteFriend">
                    <Form.Control as="select" onChange={this.onChangeSelect} size="lg" custom>
                        <option value="disabled">Choose a Friend</option>
                        {this.state.data.map((data, index) => {
                            return (
                                <option key={index} value={data.first_name + " (" + data.email + ')'}>{data.first_name + " (" + data.email + ')'}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>
            </Form>
        )
    }
    deleteFriend = () => {
        if(this.state.deleteFriend !== "") {
            const names = this.state.deleteFriend.split(' ')
            const email = names[1].slice(1, -1)
            const User = { email: this.state.email, deleteFriend: email }
            removeFriend(User).then(response => {
                if(!response.error) {
                    window.location.reload();
                }
            })
            .catch(error => console.log(error.message))
        }
        else {
            alert('Please select a friend')
        }
    }
    render() {
        return (
            <div>
                <SweetAlert
                    show={this.state.deleteOpen}
                    title="Select Friend"
                    onConfirm={this.handleDeleteCancel}
                    customButtons={
                        <React.Fragment>
                            <Button
                                variant="danger"
                                onClick={() => {
                                    this.deleteFriend();                 
                                    this.handleDeleteCancel();
                                }}
                            >
                                Remove
                            </Button>
                            <Button variant="dark" onClick={this.handleDeleteCancel}>Cancel</Button>
                        </React.Fragment>
                    }
                >
                    {this.showSelectDelete()}
                </SweetAlert>
                <div className="mt-4">
                    <h1 className="text-center">Friends You Follow</h1>
                    <div className="container mt-3">
                        <div className="d-flex justify-content-center mb-2">
                            <Button onClick={this.handleDelete} variant="outline-danger">Remove Friend</Button>
                        </div>
                        {this.state.loading && <div className="d-flex justify-content-center mt-4"><Spinner animation="border" /></div>}
                        {!this.state.loading && <DefaultList friends={this.state.data} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default FriendFeed;