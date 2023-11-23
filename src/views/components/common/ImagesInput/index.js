import React, {useState} from 'react'
import styled from 'styled-components'

import { IconButton } from '../IconButton'
import { PillLabel } from '../PillLabel'

export const ImagesInput = props => {
    const {
        label,
        imageFiles=null,
        imageURLs=null,
        showInput=true,
        allowDelete=true,
        modified=false,
        hasError=false,
        locked=false,
        allowMultiple=true,
        accept='image/*',

        onChangeImageFiles, // e => void
        onClickRemoveImageFile, // imageIndex => void
        onClickRemoveImageURL, // imageIndex => void

        ...rest
    } = props
    const [displayingImageFileFullscreen, setDisplayingImageFileFullscreen] = useState(false)
    const [displayingImageURLFullscreen, setDisplayingImageURLFullscreen] = useState(false)
    const [fullscreenImageFileIndex, setFullscreenImageFileIndex] = useState(0)
    const [fullscreenImageURLIndex, setFullscreenImageURLIndex] = useState(0)

    const onClickFullscreenImageFile = imageIndex => {
        setDisplayingImageFileFullscreen(true)
        setFullscreenImageFileIndex(imageIndex)
    }

    const onClickFullscreenImageURL = imageIndex => {
        setDisplayingImageURLFullscreen(true)
        setFullscreenImageURLIndex(imageIndex)
    }

    const onClickCloseImageFullscreen = () => {
        setDisplayingImageFileFullscreen(false)
        setDisplayingImageURLFullscreen(false)
    }

    return (
        <Root {...rest}>
            <div className='label-container'>
                <label>{label}</label>
                {hasError ?
                    <PillLabel title='Required' color='red' size='s' style={{marginRight: 10}} />
                    : null
                }
                {modified ?
                    <PillLabel title='Modified' color='yellow' size='s' />
                    : null
                }
                {locked ?
                    <i className='bi-lock-fill lock-icon' />
                    : null 
                }
            </div>
            {showInput ?
                <input
                    type='file'
                    multiple='multiple'
                    accept={accept}
                    onChange={onChangeImageFiles}
                    disabled={locked}
                />
                : null
            }
            <div className='images-container'>
                {imageFiles ?
                    imageFiles.map( (file, i) => (
                        <div className='image-container' key={file.name}>
                            <IconButton
                                size='s'
                                icon='bi-arrows-fullscreen'
                                onClick={() => onClickFullscreenImageFile(i)}
                                className='fullscreen-icon'
                            />
                            {allowDelete ?
                                <IconButton
                                    size='m'
                                    icon='bi-trash'
                                    onClick={() => onClickRemoveImageFile(i)}
                                    className='delete-icon'
                                />
                                : null
                            }
                            <img src={URL.createObjectURL(file)} className='image' />
                        </div>
                    ))
                    : null
                }
                {imageURLs ?
                    imageURLs.map( (url, i) => (
                        <div className='image-container' key={url}>
                            <IconButton
                                size='s'
                                icon='bi-arrows-fullscreen'
                                onClick={() => onClickFullscreenImageURL(i)}
                                className='fullscreen-icon'
                            />
                            {allowDelete ?
                                <IconButton
                                    size='m'
                                    icon='bi-trash'
                                    onClick={() => onClickRemoveImageURL(i)}
                                    className='delete-icon'
                                />
                                : null
                            }
                            <img src={url} className='image' />
                        </div>
                    ))
                    : null
                }
                {!imageURLs && !imageFiles ?
                    <p style={{marginTop: 5}}>None chosen</p>
                    : null
                }
            </div>
            { displayingImageFileFullscreen ?
                <div className='fullscreen-image-container'>
                    <img src={URL.createObjectURL(imageFiles[fullscreenImageFileIndex])} className='fullscreen-image' />
                    <IconButton
                        size='l'
                        icon='bi-x'
                        onClick={onClickCloseImageFullscreen}
                        className='close-icon'
                        color='white'
                    />
                </div>
                : null
            }
            { displayingImageURLFullscreen ?
                <div className='fullscreen-image-container'>
                    <img src={imageURLs[fullscreenImageURLIndex]} className='fullscreen-image' />
                    <IconButton
                        size='l'
                        icon='bi-x'
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
    flex: 1;

    & .label-container {
        display: flex;
        align-items: center;
    }
    & .label-container label {
        margin-right: 10px;
    }

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

    & .lock-icon {
        font-size: 15px;
        color: ${p => p.theme.textSecondary};
    }
`