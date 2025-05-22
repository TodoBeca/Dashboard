import { IconButton } from '@mui/material'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import React from 'react'

type AddPaisButtonProps = {
    onAddPais: () => void
    size: 'small' | 'medium' | 'large'
}

const AddPaisButton: React.FC<AddPaisButtonProps> = ({ onAddPais, size }) => {
    return (
        <IconButton
            size={size}
            onClick={() => {
                onAddPais()
            }}
        >
            <HiOutlinePlusCircle />
        </IconButton>
    )
}

export default AddPaisButton
