import React, { Component } from 'react'
import { Button } from "react-bootstrap"
import { deleteAcc } from "./Function"
import jwt_decode from "jwt-decode"

class DeleteProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }
    }
    async componentDidMount() {
        if(localStorage.usertoken) {
            const decoded = jwt_decode(localStorage.usertoken)
            this.setState({
                email: decoded.identity.email
            })
        }
        else {
            this.props.history.push('/');
        }
    }
    onDelete = () => {
        deleteAcc({ email: this.state.email }).then(response => {
            if(!response.error) {
                alert(response.result)
                localStorage.removeItem('usertoken');
                this.props.history.push('/')
            }
            else {
                alert(response.result)
            }
        })
        .catch(error => console.log(error.message))
    }
    goBack = () => {
        this.props.history.push('/profile')
    }
    render() {
        return (
            <div>
                <div className="mt-4 text-center">
                    <h2>
                        Are you sure you want to delete your Account ?
                    </h2><br />
                    <h5>Once Deleted Cannot be restored !</h5><br />
                    <Button variant="danger" onClick={this.onDelete}>Delete</Button>
                    <Button onClick={this.goBack}>Cancel</Button>
                </div>
            </div>
        )
    }
}

export default DeleteProfile;