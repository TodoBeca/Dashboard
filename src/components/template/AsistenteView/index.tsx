import React, { useState, useEffect } from 'react'
import { chatWithGPT, updateChatSettings, getActiveSettings } from '@/api/api'
import './styles.css'
import { HiOutlinePaperAirplane } from 'react-icons/hi'

interface AssistantConfig {
    prompt: string
    temperature: number
    maxTokens: number
    model: string
}

interface Message {
    role: 'user' | 'assistant'
    content: string
}

const AsistenteView: React.FC = () => {
    const [config, setConfig] = useState<AssistantConfig>({
        prompt: '',
        temperature: 0.7,
        maxTokens: 500,
        model: 'gpt-3.5-turbo',
    })
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [newMessage, setNewMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [activeSettingsId, setActiveSettingsId] = useState<string | null>(
        null,
    )

    useEffect(() => {
        const loadActiveSettings = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await getActiveSettings()
                if (response.success && response.data) {
                    setConfig({
                        prompt: response.data.systemPrompt || '',
                        temperature: response.data.temperature || 0.7,
                        maxTokens: response.data.maxTokens || 500,
                        model: response.data.model || 'gpt-3.5-turbo',
                    })
                    setActiveSettingsId(response.data._id)
                }
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Error al cargar la configuración',
                )
            } finally {
                setIsLoading(false)
            }
        }

        loadActiveSettings()
    }, [])

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!activeSettingsId) {
            setError('No se encontró la configuración activa')
            return
        }

        setIsLoading(true)
        setError(null)
        setSuccessMessage(null)

        try {
            const settingsToSave = {
                systemPrompt: config.prompt,
                temperature: config.temperature,
                maxTokens: config.maxTokens,
                model: config.model,
            }

            const result = await updateChatSettings(
                activeSettingsId,
                settingsToSave,
            )
            setSuccessMessage('Configuración guardada exitosamente')
        } catch (error) {
            setError(
                error instanceof Error ? error.message : 'Error desconocido',
            )
        } finally {
            setIsLoading(false)
        }
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || isLoading) return

        const userMessage = newMessage.trim()
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
        setNewMessage('')
        setIsLoading(true)

        try {
            const result = await chatWithGPT({
                systemPrompt: config.prompt,
                temperature: config.temperature,
                maxTokens: config.maxTokens,
                model: config.model,
                message: userMessage,
            })
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: result.response },
            ])
        } catch (error) {
            setError(
                error instanceof Error ? error.message : 'Error desconocido',
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="asistente-container">
            <div className="config-section">
                <form onSubmit={handleSaveSettings} className="assistant-form">
                    <div className="form-group">
                        <label htmlFor="prompt">Prompt del Sistema</label>
                        <textarea
                            id="prompt"
                            value={config.prompt}
                            onChange={(e) =>
                                setConfig({ ...config, prompt: e.target.value })
                            }
                            placeholder="Escribe aquí el prompt del sistema..."
                            rows={5}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="temperature">Temperatura (0-1)</label>
                        <input
                            type="number"
                            id="temperature"
                            value={config.temperature}
                            onChange={(e) =>
                                setConfig({
                                    ...config,
                                    temperature: parseFloat(e.target.value),
                                })
                            }
                            min="0"
                            max="1"
                            step="0.1"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="maxTokens">Máximo de Tokens</label>
                        <input
                            type="number"
                            id="maxTokens"
                            value={config.maxTokens}
                            onChange={(e) =>
                                setConfig({
                                    ...config,
                                    maxTokens: parseInt(e.target.value),
                                })
                            }
                            min="1"
                            max="4000"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="model">Modelo</label>
                        <select
                            id="model"
                            value={config.model}
                            onChange={(e) =>
                                setConfig({ ...config, model: e.target.value })
                            }
                        >
                            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                            <option value="gpt-4">GPT-4</option>
                            <option value="gpt-4-turbo">GPT-4 Turbo</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Guardando...' : 'Guardar Configuración'}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                {successMessage && (
                    <div className="success-message">{successMessage}</div>
                )}
            </div>

            <div className="chat-section">
                <div className="chat-container">
                    <div className="chat-header">
                        <h2>Chat de Prueba</h2>
                        <p>Prueba la configuración en tiempo real</p>
                    </div>

                    <div className="messages-container">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.role}-message`}
                            >
                                {message.content}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="loading-indicator">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                    </div>

                    <form
                        onSubmit={handleSendMessage}
                        className="input-container"
                    >
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="send-button"
                            disabled={isLoading || !newMessage.trim()}
                        >
                            <HiOutlinePaperAirplane />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AsistenteView
