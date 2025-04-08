import { IconButton } from '@mui/material'
import { HiOutlineUserAdd } from 'react-icons/hi'
import React from 'react'

type AddUserButtonProps = {
    onAddUser: () => void
    size: 'small' | 'medium' | 'large'
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ onAddUser, size }) => {
    return (
        <IconButton
            size={size}
            onClick={() => {
                onAddUser()
            }}
        >
            <HiOutlineUserAdd />
        </IconButton>
    )
}

export default AddUserButton
