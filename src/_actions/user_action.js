import axios from 'axios'
import Api from "../util/Api";

import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
} from './type.js'

export function loginUser(dataToSubmit) {

    const request = axios.post('https://www.mapgoblin.kro.kr/api/login', dataToSubmit)
        .then(response => response)
        .catch(err => err.response)

    return {
        type: LOGIN_USER,
        payload: request
    }

}

export function registerUser(dataToSubmit) {

    const request = axios.post('https://www.mapgoblin.kro.kr/api/members', dataToSubmit)
        .then(response => response)
        .catch(err => err.response)

    return {
        type: REGISTER_USER,
        payload: request
    }

}

export function auth(token) {

    const request = axios.get('https://www.mapgoblin.kro.kr/api/authentication', {
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