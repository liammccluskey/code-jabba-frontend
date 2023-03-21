import React, {useState} from 'react'
import styled from 'styled-components'

export const UserIcon = props => {
    const {
        size, // 's' | 'm' | 'l'
        user,

        ...rest
    } = props
    const hasPhoto = !!props.user.photoURL
    const [failedLoadImage, setFailedLoadImage] = useState(false)

    const onErrorLoadingImage = () => setFailedLoadImage(true)

    return hasPhoto && !failedLoadImage ?
        <Image
            src={props.user.photoURL}
            className={size}
            onError={onErrorLoadingImage}
            {...rest}
        />
        : <Icon
            className={size}
            {...rest}
        >
            <i className='bi-person' />
        </Icon>
        
}

const Image = styled.img`
    display: inline;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;

    &.s {
        height: 25px;
        width: 25px;
    }

    &.m {
        height: 35px;
        width: 35px;
    }

    &.l {
        height: 45px;
        width: 45px;
    }
`

const Icon = styled.div`
    border-radius: 50%;
    background-color: ${p => p.theme.tintTranslucent};
    color: ${p => p.theme.tint};
    display: inline-flex;
    justify-content: space-around;
    align-items: center;

    &.s {
        height: 25px;
        width: 25px;
        font-size: 15px;
    }

    &.m {
        height: 35px;
        width: 35px;
        font-size: 20px;
    }

    &.l {
        height: 45px;
        width: 45px;
        font-size: 25px;
    }
`