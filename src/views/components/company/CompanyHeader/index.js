import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Subheader } from '../../headers/Subheader'
import { StarRating } from '../../common/StarRating'

const PageLinks = [
    {
        name: 'General',
        url: '',
        id: 'general'
    },
    {
        name: 'Reviews',
        url: '/reviews',
        id: 'reviews'
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
        >
            <StarRating 
                starsTotal={5}
                starsCount={company.rating}
                reviewCount={company.reviewCount}
                size='s'
            />
        </Subheader>
    )
}