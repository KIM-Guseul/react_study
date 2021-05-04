import {observable, computed, action} from 'mobx'
import {getProductList, getCollections} from '../lib/product'

const callCollections = async() =>{
    try{
        const result = await getCollections()
        if(result.status === 200 || result.status === 201){
            product.collections = result.data
        } 
    } catch (error){
        console.log(error)
    }
}

const callProductList = async (collection) => {
    try {
        
        let params = {
            page: product.productListPage,
            limit: product.productListLimit
        }

        if (collection) {
            params['collection'] = collection
        }

        const result = await getProductList(params)
        if (result.status === 200 || result.status === 201) {
            product.productList = [...product.productList, ...result.data]
            product.productListPage = product.productListPage + 1
        }
    } catch (error) {
        
    }
}


const product = observable({
    productList : [],
    productListLimit : 2,
    productListPage : 1,
    productListTotalCount : 0,
    callProductList : callProductList,
    
})

export default product