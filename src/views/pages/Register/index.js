import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { useNavigate } from 'react-router-dom'
import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
} from 'firebase/auth'

import { 
    postMongoUser, 
    fetchThisMongoUser, 
    getIsRecruiterMode
} from '../../../redux/user'
import {auth, getFirebaseErrorMessage} from '../../../networking'
import { setThemeColor, setTintColor } from '../../../redux/theme'
import { addMessage } from '../../../redux/communication'
import { GoogleIconURL } from '../Login/constants'

import { BodyContainer } from '../../components/common/BodyContainer'
import { PageContainer } from '../../components/common/PageContainer'
import { LandingHeader } from '../../components/headers/LandingHeader'
import { LoginCard } from '../../components/landing/LoginCard'
import { ActionLink } from '../../components/common/ActionLink'
import { Button } from '../../components/common/Button'
import { PillOptions } from '../../components/common/PillOptions'
import { PendingMessage } from '../../components/common/PendingMessage'

export const UserTypes = [
    {id: 'recruiter', title: 'Recruiter'},
    {id: 'candidate', title: 'Candidate'}
]

export const RegisterComponent = props => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isRecruiter, setIsRecruiter] = useState(props.isRecruiterMode || false)
    const [loadingRegister, setLoadingRegister] = useState(false)

    useEffect(() => {
        props.setThemeColor(0)
        props.setTintColor(0)
    }, [])

    // Utils

    const setNotLoadingRegister = () => setLoadingRegister(false)

    const isValidPassword = (password) => {
        const minLength = 8
        const hasNumber = /\d/
        const hasLetter = /[a-zA-Z]/
        return password.length >= minLength && 
            hasNumber.test(password) && 
            hasLetter.test(password)
    }

    const isValidName = (name) => {
        const [first = '', last = ''] = name.split(' ')

        return first.length && last.length
    }

    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/
        return emailPattern.test(email)
    }
    

    const validateForm = () => {
        if (!email) {
            props.addMessage('You must enter a valid email address.', true)
            return false
        } else if (!isValidEmail(email)) {
            props.addMessage('The email address you entered is formatted incorrectly.', true)
            return false
        } else if (!name || !isValidName(name)) {
            props.addMessage('You must enter your first and last name.', true)
            return false
        } else if (!password) {
            props.addMessage('You must enter a valid password.', true)
            return false
        } else if (!isValidPassword(password)) {
            props.addMessage('Your password must be at least 8 characters, and contain at least one letter and number.', true, true)
            return false
        }
        return true
    }

    // Direct

    const onClickSubmit = async e => {
        e.preventDefault()

        if (!validateForm()) return

        try {
            setLoadingRegister(true)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            if (userCredential) {
                const {user} = userCredential
                const updatedFirebaseUser = {
                    ...user,
                    displayName: name,
                }
                props.postMongoUser(
                    updatedFirebaseUser,
                    isRecruiter,
                    () => props.fetchThisMongoUser(user, setNotLoadingRegister, setNotLoadingRegister, true),
                    setNotLoadingRegister
                )
            }
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error)
            props.addMessage(errorMessage, true)
            setNotLoadingRegister()
        }
    }

    const onClickContinueWithGoogle = async () => {
        try {
            setLoadingRegister(true)
            const result = await signInWithPopup(auth, new GoogleAuthProvider())
            if (result) {
                const {user} = result

                props.postMongoUser(
                    user,
                    isRecruiter,
                    () => props.fetchThisMongoUser(user, setNotLoadingRegister, setNotLoadingRegister, true),
                    setNotLoadingRegister
                )
            }
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error)
            props.addMessage(errorMessage, true)
            setNotLoadingRegister()
        }
    }

    const onClickHaveAnAccount = () => {
        navigate('/login')
    }

    const onChangeEmail = e => {
        const {value} = e.target
        if (value.includes(' ')) return
        else setEmail(value)
    }

    const onChangeName = e => setName(e.target.value)
    
    const onChangePassword = e => setPassword(e.target.value)

    return (
        <PageContainer>
            <LandingHeader showButtons={false} />
            <BodyContainer className='ai-center bgc-tt'>
                <LoginCard className='d-flex fd-column ai-stretch'>
                    <h3 style={{marginBottom: 20}}>Create your account</h3>
                    <form onSubmit={onClickSubmit} className='d-flex jc-flex-start ai-stretch fd-column'>
                        <label>Email</label>
                        <input
                            value={email}
                            onChange={onChangeEmail}
                            type="text"
                            style={{marginBottom: 15}}
                        />
                        <label>Full name </label>
                        <input
                            value={name}
                            onChange={onChangeName}
                            type="text"
                            style={{marginBottom: 15}}
                        />
                        <label>I am a</label>
                        <PillOptions
                            options={UserTypes}
                            activeOptionID={isRecruiter ? 'recruiter' : 'candidate'}
                            onClickOption={() => setIsRecruiter(curr => !curr)}
                            style={{alignSelf: 'flex-start', marginBottom: 15}}
                        />
                        <label>Password</label>
                        <input
                            value={password}
                            onChange={onChangePassword}
                            type="password"
                            style={{marginBottom: 15}}
                        />
                        {loadingRegister ? 
                            <PendingMessage message='Loading registration' style={{alignSelf: 'center' }}/>
                            : null
                        }
                        <br />
                        <Button
                            type='solid'
                            priority={2}
                            onClick={onClickSubmit}
                            title='Submit'
                            isSubmitButton={true}
                            disabled={loadingRegister}
                            style={{marginBottom: 15}}
                        />
                    </form>
                    <h4 style={{marginBottom: 20}} className='as-center'>or</h4>
                    <Button
                        type='clear'
                        priority={2}
                        onClick={onClickContinueWithGoogle}
                        imageURL={GoogleIconURL}
                        imageSize={18}
                        title='Continue with Google'
                        disabled={loadingRegister}
                    />
                </LoginCard>
                <div className='d-flex ai-center' style={{marginTop: 10}}>
                    <p style={{marginRight: 10}}>
                        Already have an account?
                    </p>
                    <ActionLink
                        title='Sign In'
                        onClick={onClickHaveAnAccount}
                    />
                </div>
            </BodyContainer>
        </PageContainer>
    )
}

const mapStateToProps = state => ({
    isRecruiterMode: getIsRecruiterMode(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addMessage,
    setTintColor,
    setThemeColor,
    postMongoUser,
    fetchThisMongoUser
}, dispatch)

export const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterComponent)