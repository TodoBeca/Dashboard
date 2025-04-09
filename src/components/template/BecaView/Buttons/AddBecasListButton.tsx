import { IconButton } from '@mui/material'
import { HiOutlineFolderAdd } from 'react-icons/hi'
import React from 'react'

type AddBecasListButtonProps = {
    onAddBecasList: () => void
    size: 'small' | 'medium' | 'large'
}

const AddBecasListButton: React.FC<AddBecasListButtonProps> = ({
    onAddBecasList,
    size,
}) => {
    return (
        <IconButton
            size={size}
            onClick={() => {
                onAddBecasList()
            }}
        >
            <HiOutlineFolderAdd />
        </IconButton>
    )
}

export default AddBecasListButton
