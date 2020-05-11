import axios from "axios"

export const register = (User) => {
    return axios.post("users/register", {
        first_name: User.first_name,
        last_name: User.last_name,
        email: User.email,
        password: User.password
    })
    .then(response => {
        return response.data
    })
    .catch(error => console.log(error.message))
}

export const login = (User) => {
    return axios.post('users/login', {
        email: User.email,
        password: User.password
    })
    .then(response => {
        localStorage.setItem('usertoken', response.data.result)
        return response.data
    })
    .catch(error => console.log(error.message))
}

export const upload = (User) => {
    return axios.post('users/upload', User.audio_file, {
        headers: {
            'Content-Type': "multipart/form-data",
            'email': User.email,
            'status': User.status
        },
    })
    .then(response => {
        return response.data
    })
    .catch(error => console.log(error.message))
}

export const updateStatus = (User) => {
    return axios.post('users/updateStatus/', User)
    .then(response => {
        return response.data
    })
    .catch(error => console.log(error.message))
}