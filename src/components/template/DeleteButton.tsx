import { IconButton } from '@mui/material'
import { HiOutlineTrash } from 'react-icons/hi'
import React from 'react'

type DeleteButtonProps = {
    onDelete: () => void
    size: 'small' | 'medium' | 'large'
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, size }) => {
    return (
        <IconButton size={size} onClick={onDelete}>
            <HiOutlineTrash />
        </IconButton>
    )
}

export default DeleteButton
