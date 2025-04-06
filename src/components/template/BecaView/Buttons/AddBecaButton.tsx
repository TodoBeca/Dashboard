import { IconButton } from '@mui/material'
import { HiOutlineDocumentAdd } from 'react-icons/hi'
import React from 'react'

type AddBecaButtonProps = {
    onAddBeca: () => void
    size: 'small' | 'medium' | 'large'
}

const AddBecaButton: React.FC<AddBecaButtonProps> = ({ onAddBeca, size }) => {
    return (
        <IconButton
            size={size}
            onClick={() => {
                onAddBeca()
            }}
        >
            <HiOutlineDocumentAdd />
        </IconButton>
    )
}

export default AddBecaButton
