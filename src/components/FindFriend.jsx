import React, { Component } from 'react'
import axios from "axios"

class FindFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    async componentDidMount() {
        await axios.post('users/getAllUsers/')
            .then(response => {
                this.setState({
                    users: response.data.users
                })
            })
            .catch(error => console.log(error.message))
    }
    render() {
        return (
            <div>
                Find me
            </div>
        )
    }
}

export default FindFriend;