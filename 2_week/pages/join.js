import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import useStore from '../store/useStore'
import { useRouter } from 'next/router'

const join = observer(() => {
    const { user } = useStore()
    const router = useRouter()
    const join = async () => {
        const data = {
            connect: false,
            verified: true,
            email: document.getElementById('email').value,
            name: {
                full: document.getElementById('name').value,
            },
            password: document.getElementById('password').value
        }
        await user.join(data, (success, msg) => {
            if (success) {
                router.push('/login')
            } else {
                alert(msg)
            }
        })
    }


    return (
        <Wrapper>
            <Header>
                <HeadInner>
                    <Logo>리액샵</Logo>
                    <LoginButton>로그인 / 회원가입</LoginButton>
                </HeadInner>
            </Header>
            <Content>
                <Title>회원가입</Title>
                <Input id='email' type='text' placeholder='이메일 주소' />
                <Input id='password' type='password' placeholder='비밀번호'/>
                <Input id='name' type='text' placeholder='이름' />
                <LoginSubmitButton onClick={e=> join()}>회원가입 하기</LoginSubmitButton>
            </Content>
        </Wrapper>
    )
})

const Header = styled.div`
    position: relative;
    width: 100%;
    height: 60px;
`

const HeadInner = styled.div`
    width: 1000px;
    height: 60px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Wrapper = styled.div`
    width: 100%;
`

const Logo = styled.h1`
    color: #000;
    margin: 0;
`

const LoginButton = styled.a`
    color: #000;
    font-size: 16px;
`

const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
`

const Title = styled.h2`
    font-weight: bold;
    margin-bottom: 20px;
    
`

const Input = styled.input`
    width: 360px;
    height: 40px;
    font-size: 16px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 20px;
`

const LoginSubmitButton = styled.a`
    width: 360px;
    height: 40px;
    border-radius: 10px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 16px;
    font-weight: bold;
`

export default join