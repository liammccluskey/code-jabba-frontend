import React, {useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { fetchThisMongoUser, logout } from '../../redux/ducks/user'
import {auth} from '../../networking'
import { addMessage } from '../../redux/ducks/communication'


export const AuthContainerComponent = props => {
    const {
        children
    } = props

    useEffect(() => {
        onAuthStateChanged(auth, firebaseUser => {
            if (firebaseUser) {
                props.addMessage('is logged in')
                props.fetchThisMongoUser(
                    firebaseUser,
                    () => window.location = '/dashboard'
                )
            } else {
                console.log('is not logged in')
            }
        })
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    addMessage,
    fetchThisMongoUser
}, dispatch)

export const AuthContainer = connect(null, mapDispatchToProps)(AuthContainerComponent)