import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useObserver } from 'mobx-react-lite'
import Link from 'next/Link'
import { useRouter } from 'next/router'
import useStore from '../store/useStore'

const login = () => {

    const router = useRouter();
    const emailRef = useRef();
    const pwRef = useRef();

    const { user } = useStore();

    const moveJoin = () => {
        router.push('/join');
    }

    const login = async() => {
        console.log(emailRef.current.value);
        console.log(pwRef.current.value);

        if (!emailRef.current.value) {
            return alert('이메일 주소를 입력해 주세요');
        }

        const data = {
            email: emailRef.current.value,
            password: pwRef.current.value
        }

        await user.login(data, (success, msg) => {
            if (success) {
                router.push('/')
            } else {
                alert(msg)
            }
        })
    }
    return useObserver (() => (
        <Wrapper>
            <Header>
                <Logo>로고</Logo>
                <Join>로그인/회원가입</Join>
            </Header>
            <LoginWrapper>
                <LoginTitle>로그인</LoginTitle>
                <LoginInput type="text" ref={emailRef} />
                <LoginInput type="password" ref={pwRef} />
                <LoginBtn onClick={e => login()}>로그인</LoginBtn>
                {/* <Link href="/join">
                    <JoinBtn>회원가입</JoinBtn>
                </Link> */}
                <JoinBtn onClick={e => moveJoin()}>회원가입</JoinBtn>
            </LoginWrapper>
        </Wrapper>
    ))
}

const Wrapper = styled.div`
    width: 100%;
`
const Header = styled.div`
    display: flex;
    width: 1020px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
`
const Logo = styled.h1`
    font-size: 30px;
`
const Join = styled.div`
`
const LoginWrapper = styled.div`
    width: 247px;
    margin: 0 auto;
`
const LoginTitle = styled.h3`
    text-align: center;
    font-size: 24px;
`
const LoginInput = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: solid 1px #707070;
    margin-bottom: 23px;
    font-size: 18px;
`
const LoginBtn = styled.button`
    width: 100%;
    height: 40px;  
    border-radius: 8px;
    border: solid 1px #707070;
    background-color: #c9c9c9;
    font-size: 16px;
`

const JoinBtn = styled.a`
    display: block;
    width: 100%;
    margin-top: 10px;
    color: red;
    font-size: 16px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    text-align: center;
`

export default login