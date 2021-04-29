import {useEffect, useState} from 'react'
import {useObserver} from 'mobx-react-lite'
import useStore from '../store/useStore'




export default function Home() {

  const [moreData, setMoreDate] = useState(false)

  const {product} = useStore()

  useEffect(()=>{
    const callData = async() => {
      await product.callProductList()
      console.log(product.productList.slice())
    }
    callData()
  },[moreData])



  return useObserver(()=>(

    <div>
      <ul>
        {product.productList.map(product => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
      <a onClick={e => {setMoreDate(!moreData)}}> 더 불러오기 </a>
    </div>

    ))
}
