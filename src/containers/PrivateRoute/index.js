import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { getIsLoggedIn } from '../../redux/ducks/user'

export const PrivateRouteComponent = props => {
    const {
        element
    } = props
    const navigate = useNavigate()

    useEffect(() => {
        if (!props.isLoggedIn) {
            navigate('/')
            console.log('NOT is logged in : redirecting to landing')
        }
    }, [])

    return props.isLoggedIn ?
        element
        : null
}

const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const PrivateRoute = connect(mapStateToProps, mapDispatchToProps)(PrivateRouteComponent)