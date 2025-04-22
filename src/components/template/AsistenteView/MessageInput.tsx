import React, { useState } from 'react'
import { MessageInputProps } from './types'
import '../AsistenteView/styles.css'

export const MessageInput: React.FC<MessageInputProps> = ({
    onSendMessage,
    isLoading,
}) => {
    const [message, setMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim() && !isLoading) {
            onSendMessage(message.trim())
            setMessage('')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e)
        }
    }

    return (
        <form className="input-container" onSubmit={handleSubmit}>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu pregunta aquí..."
                disabled={isLoading}
            />
            <button
                type="submit"
                className="send-button"
                disabled={isLoading || !message.trim()}
            >
                <i className="fas fa-paper-plane"></i>
            </button>
        </form>
    )
}
