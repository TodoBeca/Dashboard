import React from 'react'
import { LoadingIndicatorProps } from './types'
import '../AsistenteView/styles.css'

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
    isLoading,
}) => {
    if (!isLoading) return null

    return (
        <div className="loading-indicator">
            <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
