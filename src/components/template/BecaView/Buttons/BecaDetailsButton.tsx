import { IconButton } from '@mui/material'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import React from 'react'

type BecaDetailsProps = {
    becaInfo: () => void
    size: 'small' | 'medium' | 'large'
    className?: string
}

const BecaDetailsButton: React.FC<BecaDetailsProps> = ({
    becaInfo,
    size,
    className,
}) => {
    return (
        <IconButton size={size} onClick={becaInfo} className={className}>
            <HiOutlineInformationCircle />
        </IconButton>
    )
}

export default BecaDetailsButton
