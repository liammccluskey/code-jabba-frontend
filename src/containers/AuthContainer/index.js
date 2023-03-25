import React, {useEffect, useState} from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { fetchThisMongoUser, getLoadingLogout, getFirebaseUser, getIsLoggedIn } from '../../redux/user'
import {auth} from '../../networking'
import { addMessage } from '../../redux/communication'


export const AuthContainerComponent = props => {
    const {
        children
    } = props
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, firebaseUser => {
            if (firebaseUser) {
                props.fetchThisMongoUser(
                    firebaseUser,
                    () => setLoading(false),
                    () => setLoading(false)
                )
            } else {
                setLoading(false)
            }
        })
        return unsub
    }, [])

    return (
        <div>
            {!loading && !props.loadingLogout && children}
        </div>
    )
}

const mapStateToProps = state => ({
    loadingLogout: getLoadingLogout(state),
    firebaseUser: getFirebaseUser(),
    isLoggedIn: getIsLoggedIn(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addMessage,
    fetchThisMongoUser
}, dispatch)

export const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(AuthContainerComponent)