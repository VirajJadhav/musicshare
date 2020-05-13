import React, { Component } from 'react'
import jwt_decode from "jwt-decode"
import axios from "axios"

class FriendFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: [],
        }
    }
    async componentDidMount() {
        const decoded = jwt_decode(localStorage.usertoken)
        await axios.post('users/getFriends/', { email: decoded.identity.email })
            .then(response => {
                this.setState({
                    friends: response.data.friends
                })
            })
            .catch(error => console.log(error.message))
    }
    render() {
        return (
            <div>
                Hello friend
            </div>
        )
    }
}

export default FriendFeed;