import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import styled from 'styled-components'

import { MainHeader } from '../../../components/headers/MainHeader'
import { PageContainer } from '../../../components/common/PageContainer'
import { BodyContainer } from '../../../components/common/BodyContainer'
import { AdminHeader } from '../../../components/admin/AdminHeader'
import { ClickableContainer } from '../../../components/common/ClickableContainer'

const FIREBASE_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/template-project-7b481.appspot.com/o/logos%2Ffirebase_logo.png?alt=media&token=cbd4b704-1f6d-42d5-b489-a05de1e114b8'
const HEROKU_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/template-project-7b481.appspot.com/o/logos%2Fheroku_logo.png?alt=media&token=69431417-d84f-4efa-ada9-34244885a81e'
const MONGO_DB_URL = 'https://firebasestorage.googleapis.com/v0/b/template-project-7b481.appspot.com/o/logos%2Fmongo_db_logo.svg?alt=media&token=8331a2a3-6c9e-4dcd-a1a7-d92e06909907'
const NETLIFY_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/template-project-7b481.appspot.com/o/logos%2Fnetlify_logo.svg?alt=media&token=ee9c5e02-9a89-4bc2-8cf8-f3dfe9e3b50a'
const STRIPE_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/template-project-7b481.appspot.com/o/logos%2Fstripe_logo.png?alt=media&token=cc21acee-08c5-4d25-9853-598810a80cd5'
const GITHUB_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/template-project-7b481.appspot.com/o/logos%2Fgithub_logo.svg?alt=media&token=b43b79bb-ab1d-4c17-9c69-3bc695358d81'

export const AdminToolsComponent = props => {
    const {
        
    } = props

    const platforms = [
        {title: 'Firebase', logoURL: FIREBASE_LOGO_URL, url: 'https://console.firebase.google.com', usage: 'Photo Storage, Authentication'},
        {title: 'Heroku', logoURL: HEROKU_LOGO_URL, url: 'https://id.heroku.com/login', usage: 'Backend Hosting'},
        {title: 'Mongo DB', logoURL: MONGO_DB_URL, url: 'https://account.mongodb.com/account/login', usage: 'Backend Database' },
        {title: 'Netlify', logoURL: NETLIFY_LOGO_URL, url: 'https://app.netlify.com/login', usage: 'Frontend Hosting'},
        {title: 'Stripe', logoURL: STRIPE_LOGO_URL, url: 'https://dashboard.stripe.com/login', usage: 'Subscription Management'},
        {title: 'Github', logoURL: GITHUB_LOGO_URL, url: 'https://github.com/login', usage: 'Codebase'}
    ]

    const onClickPlatform = platformURL => {
        window.open(platformURL, '_blank')
    }

    return (
        <PageContainer>
            <MainHeader  />
            <AdminHeader activeLinkID='tools' />
            <BodyContainer>
                <Container>
                    <div className='section-header'>
                        <h3>Platforms</h3>
                    </div>
                    <div className='platforms-container'>
                        {platforms.map( ({title, logoURL, url, usage}) => (
                            <ClickableContainer
                                className='platform-container'
                                onClick={() => onClickPlatform(url)}
                                key={title}
                            >
                                <img className='platform-image' src={logoURL} />
                                <h3 className='platform-title'>{title}</h3>
                                <p className='usage-title'>{usage}</p>
                            </ClickableContainer>
                        ))}
                    </div>
                </Container>
            </BodyContainer>
        </PageContainer>
    )
}

const Container = styled.div`

    & .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
    }

    & .platforms-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    &.mobile .platform-container {
        margin-right: 15px;
    }
    & .platform-container:nth-child(even) {
        margin-left: 10px;
        margin-right: 0px;
    }

    & .platform-image {
        height: 50px;
        max-height: 50px;
        margin-bottom: 15px;
    }

    & .platform-title {
        margin-bottom: 10px;
    }

    & .usage-title {
        color: ${p => p.theme.textSecondary};
    }
`
const mapStateToProps = state => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch)

export const AdminTools = connect(mapStateToProps, mapDispatchToProps)(AdminToolsComponent)