import React from 'react'
import { MessageProps } from './types'
import '../AsistenteView/styles.css'

export const Message: React.FC<MessageProps> = ({ message }) => {
    return (
        <div className={`message ${message.role}-message`}>
            <div className="message-content">{message.content}</div>
        </div>
    )
}
