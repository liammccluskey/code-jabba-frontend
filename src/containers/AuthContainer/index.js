import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { onAuthStateChanged } from 'firebase/auth'

import { auth } from '../../networking'
import {
    getLoadingLogout,
    getLoadingSignIn,
    fetchThisMongoUser,
} from '../../redux/user'
import { PendingMessage } from '../../views/components/common/PendingMessage'

export const AuthContainerComponent = props => {
    const {
        children
    } = props
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, firebaseUser => {
            if (firebaseUser && !props.loadingSignIn) {
                props.fetchThisMongoUser(
                    firebaseUser,
                    () => setLoading(false),
                    () => setLoading(false),
                    true
                )
            }
        })
        return unsub
    }, [])

    return (
        <div>
            {props.loadingSignIn ?
                <Container>
                    <div className='content-container'>
                        <img className='logo-icon' src='/images/logo.png' />
                        <PendingMessage message='Logging you in' />
                    </div>
                </Container>
            : props.loadingLogout ?
                <Container>
                    <div className='content-container'>
                        <img className='logo-icon' src='/images/logo.png' />
                        <PendingMessage message='Logging you out' />
                    </div>
                </Container>
            : <div>
                {!loading && children}
            </div>
            }
        </div>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    & .content-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    & .logo-icon {
        height: 100px;
        width: 100px;
        margin-bottom: 30px;
    }
`

const mapStateToProps = state => ({
    loadingLogout: getLoadingLogout(state),
    loadingSignIn: getLoadingSignIn(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchThisMongoUser
}, dispatch)

export const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(AuthContainerComponent)