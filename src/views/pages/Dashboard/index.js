import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { PageContainer } from '../../components/common/PageContainer'
import { BodyContainer } from '../../components/common/BodyContainer'
import { MainHeader } from '../../components/headers/MainHeader'
import { Button } from '../../components/common/Button'

import {signOutUser} from '../../../redux/user'
import { Subheader } from '../../components/headers/Subheader'
import { Tooltip } from '../../components/common/Tooltip'

export const DashboardComponent = props => {
    const {
        
    } = props
    const navigate = useNavigate()

    const onClickLogOut = () => {
        props.signOutUser(() => {
            navigate('/')
        })
    }

    return (
        <PageContainer>
            <MainHeader hasSubheaderBelow={false}/>
            <BodyContainer>
            </BodyContainer>
        </PageContainer>
    )
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    signOutUser
}, dispatch)

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)

// import React from 'react'
// import {connect} from 'react-redux'
// import {bindActionCreators} from 'redux'
// import styled from 'styled-components'
// import { useNavigate } from 'react-router-dom'

// import { PageContainer } from '../../components/common/PageContainer'
// import { BodyContainer } from '../../components/common/BodyContainer'
// import { MainHeader } from '../../components/headers/MainHeader'
// import { Button } from '../../components/common/Button'

// import {signOutUser} from '../../../redux/user'
// import { Subheader } from '../../components/headers/Subheader'
// import { Tooltip } from '../../components/common/Tooltip'

// export const DashboardComponent = props => {
//     const {
        
//     } = props
//     const navigate = useNavigate()

//     const onClickLogOut = () => {
//         props.signOutUser(() => {
//             navigate('/')
//         })
//     }

//     return (
//         <PageContainer>
//             <MainHeader hasSubheaderBelow={false}/>
//             <BodyContainer>
//             </BodyContainer>
//         </PageContainer>
//     )
// }

// const mapStateToProps = state => ({
    
// })

// const mapDispatchToProps = dispatch => bindActionCreators({
//     signOutUser
// }, dispatch)

// export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent)