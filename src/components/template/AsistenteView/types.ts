export interface Message {
    role: 'user' | 'assistant'
    content: string
}

export interface ChatHeaderProps {
    title: string
    subtitle: string
}

export interface MessageProps {
    message: Message
}

export interface MessageListProps {
    messages: Message[]
    isLoading: boolean
}

export interface MessageInputProps {
    onSendMessage: (message: string) => void
    isLoading: boolean
}

export interface LoadingIndicatorProps {
    isLoading: boolean
}
