import axios from 'axios'
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    EDIT_USER,
} from './type.js'
import Api from "../util/Api";

export function loginUser(dataToSubmit) {

    const request = Api.post('/login', dataToSubmit)
        .then(response => response)
        .catch(err => err.response)

    return {
        type: LOGIN_USER,
        payload: request
    }

}

export function registerUser(dataToSubmit) {

    const request = Api.post('/members', dataToSubmit)
        .then(response => response)
        .catch(err => err.response)

    return {
        type: REGISTER_USER,
        payload: request
    }

}

export function auth(token) {

    const request = Api.get('/authentication', {
        headers: {
            'Content-Type': 'application/json',
            'X-AUTH-TOKEN': `${token}`,
        }
    })
        .then(response => response)
        .catch(err => err.response)

    return {
        type: AUTH_USER,
        payload: request
    }

}

export function editUser(dataToSubmit) {

    const request = Api.post("/members/profile", dataToSubmit)
        .then(response => response)
        .catch(err => err.response)

    return {
        type: EDIT_USER,
        payload: request
    }
}