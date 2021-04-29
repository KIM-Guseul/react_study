import axios from 'axios'
import base from './base.json'

export const getProductList = (params) => {
    return axios({
        method: 'get',
        baseURL: base.baseUrl,
        url: '/products',
        params: params,
        headers: {
            'Authorization': 'Bearer ' + base.token,
            "Content-Type": "application/json"
        }
    })
}
