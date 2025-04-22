import React from 'react'
import { ChatHeaderProps } from './types'
import './styles.css'

export const ChatHeader: React.FC<ChatHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="chat-header">
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
    )
}
