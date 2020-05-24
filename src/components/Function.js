import axios from "axios"

export const register = (User) => {
    return axios.post("users/register", {
        first_name: User.first_name,
        last_name: User.last_name,
        email: User.email,
        password: User.password,
        friends: [],
        songs: [],
        status: [],
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
        if(localStorage.usertoken) {
            localStorage.removeItem('usertoken')
            localStorage.setItem('usertoken', response.data.result)
        }
        else
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

export const deleteSong = (User) => {
    return axios.post('users/deleteSong/', User)
    .then(response => {
        return response.data
    })
    .catch(error => console.log(error.message))
}

export const removeFriend = (User) => {
    return axios.post('users/deleteFriend/', User)
        .then(response => {
            return response.data
        })
        .catch(error => console.log(error.message))
}

export const resetPassword = (User) => {
    return axios.post('users/resetRedirect/', User)
        .then(response => {
            return response.data
        })
        .catch(error => console.log(error.message))
}

export const sendMail = (User) => {
    return axios.post('users/sendMail/', User)
        .then(response => {
            return response.data
        })
        .catch(error => console.log(error.message))
}

export const deleteAcc = (User) => {
    return axios.post('users/deleteAccount/', User)
        .then(response => {
            return response.data
        })
        .catch(error => console.log(error.message))
}