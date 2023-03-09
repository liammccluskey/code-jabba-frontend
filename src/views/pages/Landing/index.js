import React, {useEffect} from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { setThemeColor, setTintColor } from '../../../redux/ducks/theme'
import { BodyContainer } from '../../components/common/BodyContainer'
import { PageContainer } from '../../components/common/PageContainer'
import { LandingHeader } from '../../components/headers/LandingHeader'

export const Landing = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setThemeColor(0))
        dispatch(setTintColor(0))
    }, [])

    return (
        <PageContainer>
            <LandingHeader showButtons={true} />
            <BodyContainer>

            </BodyContainer>
        </PageContainer>
    )
}