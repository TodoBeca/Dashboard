import { IconButton } from '@mui/material'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import React from 'react'

type PaisDetailsProps = {
    paisInfo: () => void
    size: 'small' | 'medium' | 'large'
    className?: string
}

const PaisDetailsButton: React.FC<PaisDetailsProps> = ({
    paisInfo,
    size,
    className,
}) => {
    return (
        <IconButton size={size} onClick={paisInfo} className={className}>
            <HiOutlineInformationCircle />
        </IconButton>
    )
}

export default PaisDetailsButton
