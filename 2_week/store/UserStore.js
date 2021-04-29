import {decorate, observable, computed, action} from 'mobx'
import { useCallback } from 'react';
// 유저 정보가 모이는 공간.
import {postCustomerCreate,postCustomerAuth} from '../lib/user'

const join = async (data, callback) => {
    try{
        const result = await postCustomerAuth(data);
        if (result.status == 200 || result.status == 201){

            callback(true, '회원가입 성공')
        }

    } catch(err){
        if(err){
            if(err.response.status === 400){
                callback(false, '중복된 이메일이 있습니다')
            
            }else if (err.response.status === 500){
                callback(false, '인터넷 환경을 확인하세요')

            }
            
        }
    }
}

const login = async (data, callback) => {

    try{
        const result = await postCustomerAuth(data);
        if(result.status == 200 || result.status == 201){
            localStorage.setItem('rstoken', result.data.token)
            user.token = result.data.token

            callback(true, '환영합니다')
        }

    }catch(err){
        console.log(err);
            if(err){
                if(err.response.status == 401){
                    callback(false, '비밀번호를 확인하세요')
                }else if (err.response.status === 404){
                    callback(false, '존재하지 않는 회원입니다')
                }else if (err.response.status === 500){
                    callback(false, '인터넷 환경을 확인하세요')
                }
            }
    }
}

const user = observable({
    token: typeof window == 'object' ? localStorage.getItem('rstoken') ? localStorage.getItem('rstoken') : null : null,
    name: typeof window == 'object' ? localStorage.getItem('rsname') ? localStorage.getItem('rsname') : null : null,
    email: typeof window == 'object' ? localStorage.getItem('rsemail') ? localStorage.getItem('rsemail') : null : null,
    join: join,
    login: login
})

export default user