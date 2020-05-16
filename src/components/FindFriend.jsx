import React, { Component } from 'react'
import jwt_decode from "jwt-decode"
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox"
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Button, ListGroup, Col, Spinner } from "react-bootstrap"
import SweetAlert from "react-bootstrap-sweetalert";
import axios from "axios"

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class FindFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            alertName: "",
            alertEmail: "",
            data: [],
            friends: [],
            users: "",
            record: false,
            loading: true,
        }
    }
    async componentDidMount() {
        if(localStorage.usertoken) {
            const decoded = jwt_decode(localStorage.usertoken)
            await axios.post('users/getAllUsers/', { 'email': decoded.identity.email })
                .then(response => {
                    axios.post('users/getFriends/', {'email': decoded.identity.email })
                        .then(res => {
                            const users = response.data.users;
                            const userFriends = res.data.friends;
                            if(userFriends.length > 0) {
                                for(let i = 0; i < userFriends.length; i++) {
                                    for(let j = 0; j < users.length; j++) {
                                        if(userFriends[i] === users[j].email) {
                                            users.splice(j, 1)
                                        }
                                    }
                                }
                                this.setState({
                                    data: users,
                                    friends: userFriends,
                                    loading: false,
                                })
                            }
                            else {
                                this.setState({
                                    data: users,
                                    loading: false,
                                })
                            }
                        })
                        .catch(error => console.log(error.message))
                })
                .catch(error => console.log(error.message))
        }
        else {
            this.props.history.push('/')
        }
    }
    handleAlertCanel = () => {
        this.setState({
            open: false
        })
    }
    handleAlert = () => {
        if(this.state.users !== "" && this.state.users !== null) {
            this.setState({
                open: true,
                alertName: this.state.users.first_name + " " + this.state.users.last_name,
                alertEmail: this.state.users.email
            })
        }
    }
    onChange = (value) => {
        this.setState({
            users: value
        })
    }
    onSubmit = () => {
        if(this.state.alertEmail !== "") {
            const decoded = jwt_decode(localStorage.usertoken)
            axios.post('users/addFriend/', { email: decoded.identity.email, friendEmail: this.state.alertEmail })
                .then(response => {
                    if(!response.error) {
                        this.setState({
                            open: false
                        })
                        window.location.reload();
                    }
                })
                .catch(error => console.log(error.message))
        }
    }
    showUser = (index) => {
        const user = this.state.data[index]
        this.setState({
            open: true,
            alertName: user.first_name + " " + user.last_name,
            alertEmail: user.email,
        })
    }
    returnUsers = () => {
        const users = this.state.data.map((row, index) => {
            if(index % 2 === 0)
                return  <ListGroup.Item variant="info" key={index} action onClick={() => this.showUser(index)}>{row.first_name + " " + row.last_name}</ListGroup.Item>
            else
                return <ListGroup.Item key={index} action onClick={() => this.showUser(index)}>{row.first_name + " " + row.last_name}</ListGroup.Item>
        })
        return users;
    }
    render() {
        return (
            <div className="mt-4">
                <SweetAlert
                    show={this.state.open}
                    title="User"
                    onConfirm={this.handleAlertCanel}
                    customButtons={
                        <React.Fragment>
                            <Button variant="primary" onClick={() => this.onSubmit()}>
                                Follow Friend
                            </Button>
                            <Button variant="dark" onClick={this.handleAlertCanel}>Cancel</Button>
                        </React.Fragment>
                    }
                    >
                        {this.state.alertName}<br/>
                        {this.state.alertEmail}
                    </SweetAlert>
                <h1 className="text-center">
                    Find Your Friends
                </h1>
                <div className="d-flex justify-content-center">
                        <Autocomplete
                        id="checkboxes-tags-demo"
                        // multiple
                        onChange={(event, value) => this.onChange(value)}
                        options={this.state.data}
                        getOptionLabel={(option) => option.first_name}
                        renderOption={(option, { selected }) => (
                            <React.Fragment>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                            {option.first_name + " " + option.last_name}
                            </React.Fragment>
                        )}
                        style={{ width: 500 }}
                        renderInput={(params) => (
                            <TextField {...params} variant="outlined" label="Search Friends" placeholder="Favorites" />
                        )}
                        />
                        <Button variant="primary" size="sm" className="ml-2" onClick={this.handleAlert}>Follow Friend</Button>
                </div>
                <div className="d-flex justify-content-center mt-3">
                {this.state.loading && <div><Spinner animation="border" /></div>}
                {!this.state.loading && <Col md="6">
                        <ListGroup as="ul">
                            {this.returnUsers()}
                        </ListGroup>
                    </Col>}
                </div>
            </div>
        )
    }
}

export default FindFriend;