import React, { Component } from 'react'
import jwt_decode from "jwt-decode"
import DefaultList from "./DesignComponents/DefaultList"
import axios from "axios"

class FriendFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friends: {},
            data: [],
            loading: false,
        }
    }
    async componentDidMount() {
        const decoded = jwt_decode(localStorage.usertoken)
        await axios.post('users/getFriendsData/', { email: decoded.identity.email })
            .then(response => {
                const data = []
                for(let i = 1; i <= Object.keys(response.data).length; i++) {
                    data.push(response.data['friend' + i])
                }
                this.setState({
                    data,
                    friends: response.data,
                    loading: true
                })
            })
            .catch(error => console.log(error.message))
    }
    render() {
        return (
            <div className="mt-4">
                <h1 className="text-center">Friends You Follow</h1>
                <div className="container">
                    {this.state.loading && <DefaultList friends={this.state.data} />}
                </div>
            </div>
        )
    }
}

export default FriendFeed;