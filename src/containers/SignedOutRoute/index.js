import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { getIsLoggedIn } from '../../redux/ducks/user'

export const SignedOutRouteComponent = props => {
    const {
        element
    } = props
    const navigate = useNavigate()

    useEffect(() => {
        props.isLoggedIn && navigate('/dashboard')
    }, [props.isLoggedIn])

    return !props.isLoggedIn ?
        element
        : null
}

const Root = styled.div`
    
`
const mapStateToProps = state => ({
    isLoggedIn: getIsLoggedIn(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const SignedOutRoute = connect(mapStateToProps, mapDispatchToProps)(SignedOutRouteComponent)