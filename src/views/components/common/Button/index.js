import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'

import {getTheme} from '../../../../redux/ducks/theme'

const getStyles = (priority, type, theme, propStyle) => ({
    Root: {
        backgroundColor: {
            s: theme.tint,
            c: 'clear',
            t: 'clear'
        }[type],
        color: {
            s: theme.bgcLight,
            c: theme.tint,
            t: theme.tint,
        }[type],
        borderColor: {
            s: theme.tint,
            c: theme.bc,
            t: 'clear',
        }[type],
        padding: {
            1: '10px 25px',
            2: '7px 20px'
        }[priority],
        fontSize: {
            1: '17px',
            2: '14px'
        }[priority],
        ...propStyle
    },

})

export const ButtonComponent = props => {
    const {
        priority, // 0 : big , 1 : medium
        type, // s : solid, c : clear, t : tint
        title,
        style,
        className='',
        imageURL=null,
        imageSize=18,
        iconClassName=null,
        iconSize=18,
    
        onClick
    } = props
    
    const styles = getStyles(priority, type, props.theme, style)
    const rootClassName = `${type}-${priority} ${className}`

    return (
        <Root
            style={styles.Root}
            className={rootClassName}
            onClick={onClick}
        >
            {imageURL ?
                <img
                    src={imageURL}
                    height={imageSize}
                    width={imageSize}
                />
                : null
            }
            {iconClassName ?
                <i
                    className={iconClassName}
                    style={{fontSize: iconSize}}
                />
                : null
            }
            {title}
        </Root>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state)
})

const Root = styled.div`
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    border-radius: 5px;
    border: 1px solid;

    &:hover {
        transition: 0.3s
    }

    &.s-1:hover,
    &.s-2:hover {
        filter: brightness(80%);
    }

    &.c-1:hover,
    &.c-2:hover,
    &.t-1:hover,
    &.t-2:hover {
        background-color: ${p => p.theme.tintTranslucent};
    }

    i, img {
        margin-right: 10px;
    }
`

export const Button = connect(mapStateToProps)(ButtonComponent)