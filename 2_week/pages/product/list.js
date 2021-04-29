import axios from 'axios'
import base from './base.json'

export function postCustomerCreate(params) {
    return axios({
        method: 'get',
        baseURL: base.baseUrl,
        url: '/customers',
        data: params,
        headers: {
            'Authorization': 'Bearer ' + base.token,
            "Content-Type": "application/json"
        }
    })
}