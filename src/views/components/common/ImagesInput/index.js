import React, {useState} from 'react'
import styled from 'styled-components'

import { IconButton } from '../IconButton'

export const ImagesInput = props => {
    const {
        label,
        imageFiles,
        showInput=true,
        allowDelete=true,

        onChangeImageFiles, // e => void
        onClickRemoveImage, // imageIndex => void

        ...rest
    } = props
    const [displayingImageFullscreen, setDisplayingImageFullscreen] = useState(false)
    const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0)

    const onClickFullscreenImage = imageIndex => {
        setDisplayingImageFullscreen(true)
        setFullscreenImageIndex(imageIndex)
    }

    const onClickCloseImageFullscreen = () => {
        setDisplayingImageFullscreen(false)
    }

    return (
        <Root {...rest}>
            <label>{label}</label>
            {showInput ?
                <input
                    type='file'
                    multiple='multiple'
                    accept='image/*'
                    onChange={onChangeImageFiles}
                />
                : null
            }
            <div className='images-container'>
                {imageFiles.map( (file, i) => (
                    <div className='image-container' key={file.name}>
                        <IconButton
                            size='s'
                            iconClassName='bi-arrows-fullscreen'
                            onClick={() => onClickFullscreenImage(i)}
                            className='fullscreen-icon'
                        />
                        {allowDelete ?
                            <IconButton
                                size='m'
                                iconClassName='bi-trash'
                                onClick={() => onClickRemoveImage(i)}
                                className='delete-icon'
                            />
                            : null
                        }
                        <img src={URL.createObjectURL(file)} className='image' />
                    </div>
                ))}
            </div>
            { displayingImageFullscreen ?
                <div className='fullscreen-image-container'>
                    <img src={URL.createObjectURL(imageFiles[fullscreenImageIndex])} className='fullscreen-image' />
                    <IconButton
                        size='l'
                        iconClassName='bi-x'
                        onClick={onClickCloseImageFullscreen}
                        className='close-icon'
                        color='white'
                    />
                </div>
                : null
            }
        </Root>
    )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 40px;

    & input {
        width: 50%;
        box-sizing: border-box;
    }

    & .images-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    & .image-container {
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 150px;
        height: 100px;
        background-color: ${p => p.theme.bgcHover};
        border: 1px solid ${p => p.theme.bc};
        border-radius: 5px;
        margin-left: 10px;
        margin-top: 10px;
    }
    & .image-container:first-child {
        margin-left: 0px;
    }

    & .image {
        height: min(100%, auto);
        width: min(100%, auto);
        max-height: 100px;
        max-width: 150px;
    }

    & .delete-icon {
        position: absolute;
        top: 2px;
        right: 2px;
    }

    & .fullscreen-icon {
        position: absolute;
        top: 2px;
        left: 2px;
    }

    & .fullscreen-image-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: fixed;
        top: 0px;
        right: 0px;
        height: 100vh;
        width: 100vw;
        backdrop-filter: brightness(50%) blur(2px);
        z-index: 10;
    }

    & .fullscreen-image {
        height: min(90%, auto);
        width: min(90%, auto);
        max-height: 90%;
        max-width: 90%;
    }

    & .close-icon {
        position: fixed;
        top: 20px;
        right: 20px;
    }
`