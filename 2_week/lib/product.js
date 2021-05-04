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

export function getProduct(pid) {
    return axios({
        method: 'get',
        baseURL: base.baseUrl,
        url: `/products/${pid}`,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
            'Authorization': `Bearer ${base.token}`
        }
    })
}

export function getCollections() {
    return axios({
        method: 'get',
        baseURL: base.baseUrl,
        url: `/collections`,
        params: {
            page:1,
            limit:120
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip',
            'Authorization': `Bearer ${base.token}`
        }
    })
}