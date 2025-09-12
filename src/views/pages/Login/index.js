import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { fetchThisMongoUser } from '../../../redux/user'
import {auth, getFirebaseErrorMessage} from '../../../networking'
import { addMessage } from '../../../redux/communication'
import { setThemeColor, setTintColor } from '../../../redux/theme'
import { GoogleIconURL } from './constants'

import { BodyContainer } from '../../components/common/BodyContainer'
import { PageContainer } from '../../components/common/PageContainer'
import { LandingHeader } from '../../components/headers/LandingHeader'
import { LoginCard } from '../../components/landing/LoginCard'
import { ActionLink } from '../../components/common/ActionLink'
import { Button } from '../../components/common/Button'

export const LoginComponent = props => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        props.setThemeColor(0)
        props.setTintColor(0)
    }, [])

    const onClickSubmit = async e => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            if (userCredential) {
                const {user} = userCredential
                props.fetchThisMongoUser(user, undefined, undefined, true)
            }
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error) || 'The email and password you entered are incorrect.'
            props.addMessage(errorMessage, true)
        }
    }

    const onClickContinueWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider())
            if (result) {
                const {user} = result
                props.fetchThisMongoUser(user, undefined, undefined, true)
            }
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error)
            props.addMessage(errorMessage, true)
        }
    }

    const onClickForgotPassword = () => {
        navigate('/reset')
    }

    const onClickDontHaveAnAccount = () => {
        navigate('/register')
    }

    const onChangeEmail = e => setEmail(e.target.value)
    
    const onChangePassword = e => setPassword(e.target.value)

    return (
        <PageContainer>
            <LandingHeader showButtons={false} />
            <BodyContainer className='ai-center bgc-tt'>
                <LoginCard className='d-flex fd-column ai-stretch'>
                    <h3 style={{marginBottom: 20}}>Sign in to your account</h3>
                    <form onSubmit={onClickSubmit} className='d-flex jc-flex-start ai-stretch fd-column'>
                        <label>
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={onChangeEmail}
                            type="email"
                            required
                            style={{marginBottom: 15}}
                        />
                        <label>
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={onChangePassword}
                            type="password"
                            required
                        />
                        <ActionLink
                            title='Forgot Password?'
                            onClick={onClickForgotPassword}
                            style={{marginTop: 5, marginBottom: 20}}
                        />
                        <Button
                            type='solid'
                            priority={2}
                            onClick={onClickSubmit}
                            title='Submit'
                            isSubmitButton={true}
                            style={{marginBottom: 20}}
                        />
                    </form>
                    <h4 
                        className='as-center'
                        style={{marginBottom: 20}}
                    >or</h4>
                    <Button
                        type='clear'
                        priority={2}
                        onClick={onClickContinueWithGoogle}
                        imageURL={GoogleIconURL}
                        imageSize={18}
                        title='Continue with Google'
                    />
                </LoginCard>
                <div className='d-flex ai-center' style={{marginTop: 10}}>
                    <p style={{marginRight: 10}}>
                        Don't have an account?
                    </p>
                    <ActionLink
                        title='Sign Up'
                        onClick={onClickDontHaveAnAccount}
                    />
                </div>
            </BodyContainer>
        </PageContainer>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addMessage,
    setTintColor,
    setThemeColor,
    fetchThisMongoUser
}, dispatch)

export const Login = connect(null, mapDispatchToProps)(LoginComponent)