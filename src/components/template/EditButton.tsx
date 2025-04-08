import { IconButton } from '@mui/material'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import React from 'react'

type EditButtonProps = {
    isOpen: () => void
    size: 'small' | 'medium' | 'large'
}

const EditButton: React.FC<EditButtonProps> = ({ isOpen, size }) => {
    return (
        <IconButton size={size} onClick={isOpen}>
            <HiOutlinePencilAlt />
        </IconButton>
    )
}

export default EditButton
