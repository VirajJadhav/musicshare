import React, { Component } from 'react'
import jwt_decode from "jwt-decode"
import {upload} from "./Function.js"

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
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
    onSubmit = (event) => {
        event.preventDefault();
        const User = {
            email: this.state.email
        }
        upload(User).then(res => {
            if(res.audio_file) {
                // this.props.history.push('/profile')
                console.log("reached");
            }
        })
        .catch(error => console.log(error.messgae))
    }
    render() {
        return (
            <div className="container">
                <div className="jubmbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">
                            Profile
                        </h1>
                    </div>
                    <form method="POST" noValidate onSubmit={this.onSubmit} encType="multipart/form-data">
				        <input type="file" name="audio_file" />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default UserProfile;