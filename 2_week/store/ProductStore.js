import {observable, computed, action} from 'mobx'
import {getProductList} from '../lib/product'

const callProductList = async() =>{
    try{

        const params ={
            page : product.productListPage,
            limit : product.productListLimit
        }

        const result = await getProductList(params)
        if(result.status === 200 || result.status === 201){
            product.productList = [...product.productList, ...result.data]
            product.productListPage = product.productListPage + 1
        }

    }catch(error) {

    }


}


const product = observable({
    productList : [],
    productListLimit : 2,
    productListPage : 1,
    productListTotalCount : 0,
    callProductList : callProductList
    
})

export default product