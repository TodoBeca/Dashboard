import * as React from 'react'
import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { HiOutlineUpload } from 'react-icons/hi'

type UploadButtonProps = {
    size: 'small' | 'medium' | 'large'
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

const UploadButton: React.FC<UploadButtonProps> = ({ onChange, size }) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleButtonClick = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e)
        }
    }

    return (
        <>
            <IconButton size={size} onClick={handleButtonClick}>
                <HiOutlineUpload />
            </IconButton>
            <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                ref={inputRef}
            />
        </>
    )
}

export default UploadButton
