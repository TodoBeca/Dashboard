import { IconButton } from '@mui/material'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import React from 'react'

type DuplicateBecaButtonProps = {
    onDuplicateBeca: () => void
    size: 'small' | 'medium' | 'large'
}

const DuplicateBecaButton: React.FC<DuplicateBecaButtonProps> = ({
    onDuplicateBeca,
    size,
}) => {
    return (
        <IconButton
            size={size}
            onClick={() => {
                onDuplicateBeca()
            }}
        >
            <HiOutlineDocumentDuplicate />
        </IconButton>
    )
}

export default DuplicateBecaButton
