import React, { useEffect, useRef } from 'react'
import { MessageListProps } from './types'
import { Message } from './Message'
import { LoadingIndicator } from './LoadingIndicator'
import '../AsistenteView/styles.css'

export const MessageList: React.FC<MessageListProps> = ({
    messages,
    isLoading,
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className="messages-container">
            {messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}
            <LoadingIndicator isLoading={isLoading} />
            <div ref={messagesEndRef} />
        </div>
    )
}
