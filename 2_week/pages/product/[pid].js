import React, {useEffect, useState} from 'react';
import {getProduct} from "../../lib/product";
// import _error from "../_error";0
// import Error from "next/error";

const ProductDetail = ({data}) => {
    // 잘못된 상품 ID일 경우
    // if(!data) {
    //     // return <_error statusCode={500} />
    //     return <Error statusCode={500} />
    // }

    const {name, thumbnail, price, description} = data;

    console.log(data);

    // 상품 상세 가져오기 (1) : useEffect()
    // 빈 화면에서 -> 상품이 채워지게 된다.
    // 업데이트가 빈번할 경우 활용 (무한 스크롤)
    /*
    useEffect(() => {
        const getPath = () => {
            console.log(router.query);
            // 7번 데이터를 불러와서 state 안에 저장
            // setProductData(result)
        }

        getPath();
    }, [router.query]);
    */

    return (
        <div>
            <h2>{name}</h2>
            <h3>{price.sale.formatted}</h3>
            <img src={thumbnail.url} alt=""/>
            <div dangerouslySetInnerHTML={{__html: description}}></div>
        </div>
    )
}

// 상품 상세 가져오기 (3) : getServerSideProps()
// 한 번 불러오면 업데이트 되지 않는 데이터
export const getServerSideProps = async (context) => {
    console.log(context.params)
    let code = 0;
    let data = null;
    try {
        const result = await getProduct(context.params.pid)
        if (result.status === 200 || result.status === 201) {
            code = 200;
            data = result.data

        }
    } catch (err) {
        code = err.response.status

    } finally {
        return {
            props: {
                data: data,
                code: code
            }
        }
    }
}


// 상품 상세 가져오기 (2) : getStaticPaths(), getStaticProps()
// getStaticPaths() : 쿼리를 가져올 수 있지만, ID 값이 미리 등록되어 있어야 한다.
// 사전에 등록되지 않은 값을 입력하면 404 에러가 뜬다.
// yarn start, yarn build로 시작
// 새로 빌드를 하지 않으면 params가 자동으로 추가되지 않음
// 카테고리가 명확하게 정해져 있다면, 미리 params 안에 넣어두면 퍼포먼스가 띄어나다.
/*
export const getStaticPaths = () => {

    console.log('paths')
    return {
        paths: [{
            params: { pid: '14' }
        }],
        fallback: false
    }
}

// getStaticProps : 쿼리를 받아올 수 없기 때문에 getStaticPaths 결합해서 사용해야 한다.
export const getStaticProps = ({ params }) => {
    // console.log(params.pid)
    return {
        props: {
            dataResult: params.pid
        }
    }
}
*/

export default ProductDetail;