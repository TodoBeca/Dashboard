import { IconButton } from '@mui/material'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import React from 'react'

type UserDetailsProps = {
    userInfo: () => void
    size: 'small' | 'medium' | 'large'
    className?: string
}

const UserDetailsButton: React.FC<UserDetailsProps> = ({
    userInfo,
    size,
    className,
}) => {
    return (
        <IconButton size={size} onClick={userInfo} className={className}>
            <HiOutlineInformationCircle />
        </IconButton>
    )
}

export default UserDetailsButton
