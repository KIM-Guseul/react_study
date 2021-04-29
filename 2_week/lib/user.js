import axios from 'axios'
import base from './base.json'

export function postCustomerCreate(data) {
    return axios({
        method: 'post',
        baseURL: base.baseUrl,
        url: '/customers',
        data: data,
        headers: {
            'Authorization': 'Bearer ' + base.token,
            "Content-Type": "application/json"
        }
    })
}

export function postCustomerAuth(data){
    return axios({
        method: 'post',
        baseURL: base.baseUrl,
        url: '/customers/auth',
        data: data,
        headers: {
            'Authorization': 'Bearer ' + base.token,
            "Content-Type": "application/json"
        }
    })
}