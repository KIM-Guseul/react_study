import { useEffect, useState } from 'react'
import { useObserver } from 'mobx-react-lite'
import 'mobx-react-lite/batchingForReactDom'
import useStore from '../store/useStore'
import styled from 'styled-components'
import Link from 'next/link'
import { getCollections } from '../lib/product'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { useRouter } from 'next/router'

export default function Home({ collections, cid }) {
  console.log(collections)
  const [moreData, setMoreData] = useState(false)
  const { product } = useStore()
  const router = useRouter()

  useBottomScrollListener(() => {
    const callData = async () => {
      await product.callProductList(cid)
    }
    callData()
  })


  useEffect(() => {
    const callData = async () => {
      product.productList = []
      product.productListPage = 1
      await product.callProductList(cid)
      
    }
    callData()
  }, [cid])


  return useObserver(()=>(
    <Wrapper>
        <Header>
            <Logo>로고</Logo>
            <Join>로그인/회원가입</Join>
        </Header>

        <Category>
          <CateBtn onClick={e=> {router.push('/')}}>전체</CateBtn>
            {collections.map(c => (
          <CategoryList onClick={e=> {router.push(`/?cid=${c._id}`)}} key={c._id}>{c.name}</CategoryList>
          ))}
        </Category>
        
        <ProductList>
            {product.productList.map(product => (
                <Product key={product._id}>
                  <Link href={`/product/${product._id}`}>
                    <a>
                      <ProductImage src={product.thumbnail.url}/>
                      <ProductName> {product.name} </ProductName>
                      <ProductSummary>{product.summary}</ProductSummary>
                      {/* <ProductDetail dangerouslySetInnerHTML={{__html:product.description}}></ProductDetail> */}
                      <ProductPrice> {product.price.original.converted} {product.price.sale.converted} </ProductPrice>
                    </a>
                  </Link>
                </Product>
            ))}
        </ProductList>

        {/* <MoreBtn onClick={e => {setMoreDate(!moreData)}}> 더 불러오기 </MoreBtn> */}
    </Wrapper>

    ))
}

export const getServerSideProps = async (context) => {
  // const collection = context.params.collection
  const q = context.query
  console.log(q)
  const cid = q.cid
  let collections = []
  try {
    const result = await getCollections()
    
    if (result.status === 200 || result.status === 201) {
      collections = result.data
    }
  } catch (err) {
    
  } finally {
    return {
      props: {
        collections: collections,
        cid: cid ? cid : ''
      }
    }
  }

}

const Wrapper = styled.div`
    width: 1020px;
    margin: 0 auto;
`
const Header = styled.div`
    display: flex;
    width: 1020px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #bcbcbc;
`
const Logo = styled.h1`
    font-size: 30px;
`
const Join = styled.div`
`

const Category = styled.div`
    list-style:none;
    margin: 30px auto;
`
const CateBtn = styled.span`
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 5px 15px;
    margin: 0 15px;
    // background-color: ${props => props.active? '#eee' : 'none'};
    &:first-child{
      margin-left:0;
    }
`
const CategoryList = styled.span`
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 5px 15px;
    margin: 0 15px;
    // background-color: ${props => props.active? '#eee' : 'none'};
    &:first-child{
      margin-left:0;
    }
`

const ProductList = styled.ul`
    list-style:none;
    width: 40%;
`
const Product = styled.li`
    margin: 30px auto;
    width: 100%;
`
const ProductImage = styled.img`
    width: 100%;
`
const ProductName = styled.h3`
`
const ProductSummary = styled.p`
`
const ProductPrice = styled.p`
    text-align: right; 
`
// const MoreBtn = styled.a`
//     cursor: pointer;
//     background: #eee;
//     border-radius: 8px;
//     padding: 5px 15px;
//     margin: 30px 15px;
// `



