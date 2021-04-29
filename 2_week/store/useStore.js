import user from './UserStore'
// 프로덕트 스토어 등등... 필요한 스토어를 여기서 관리할 수 있게
import product from './ProductStore'


const useStore = () => {
    return{
        user: user,
        product : product
    }

}

export default useStore