import React from 'react'

import { Subheader } from '../../headers/Subheader'

const PageLinks = [
    {
        name: 'General',
        url: '',
        id: 'general'
    },
    {
        name: 'Jobs',
        url: '/jobs',
        id: 'jobs'
    }
]

export const CompanyHeader = props => {
    const {
        activeLinkID,
        company
    } = props

    return (
        <Subheader
            title={company.name}
            path={`/companies/${company._id}`}
            activeLinkID={activeLinkID}
            links={PageLinks}
        />
    )
}