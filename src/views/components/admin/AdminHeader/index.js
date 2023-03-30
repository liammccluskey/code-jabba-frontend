import React from 'react'

import { Subheader } from '../../headers/Subheader'

const PageLinks = [
    {
        name: 'General',
        url: '',
        id: 'general'
    },
    {
        name: 'Bug Reports',
        url: '/bugreports',
        id: 'bug-reports'
    },
    {
        name: 'FAQ',
        url: '/faq',
        id: 'faq'
    },
    {
        name: 'Tools',
        url: '/tools',
        id: 'tools'
    }
]

export const AdminHeader = props => {
    const {
        activeLinkID
    } = props

    return (
        <Subheader
            title='Admin Console'
            path='/admin'
            activeLinkID={activeLinkID}
            links={PageLinks}
        />
    )
}