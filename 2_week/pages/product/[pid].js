import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const ProductDetail = ({ dataResult }) => {
    const [productData, setProductData] = useState(null)
    const router = useRouter()
    console.log(router.query)
    useEffect(() => {
        const getPath = () => {
            console.log(router.query)
    //         // 7번 데이터를 불러오기
    //         // 불러온 값을 state에 저장
    //         // setProductData(result)
        }

        getPath()
    }, [router.query])
    

    return (
        <div></div>
    )
}

export const getServerSideProps = (context) => {
    console.log(context.params)
    //8번에 대한 데이터를 불러오고
    //props로 넘긴다.
    return {
        props: {
            dataResult: result
        }
    }
}

// export const getStaticPaths = () => {
//     //전체리스트의 pid 값을 전부 가져온다
    
//     console.log('paths')
//     return {
//         paths: [{
//             params: { pid: '7' }
//         }, {
//             params: { pid: '8' }
//         }],
//         fallback: false
//     }
// }

// export const getStaticProps = ({ params }) => {
//     console.log(params.pid)
//     //7번 데이터 호출
//     //결과값 : result
//     return {
//         props: {
            
//         }
//     }
// }

export default ProductDetail