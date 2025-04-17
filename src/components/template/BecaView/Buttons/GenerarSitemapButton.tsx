import { Button } from '@/components/ui'
import React from 'react'

type GenerarSitemapButtonProps = {
    onClick: () => void
    size: 'sm' | 'md' | 'lg'
}

const GenerarSitemapButton: React.FC<GenerarSitemapButtonProps> = ({
    onClick,
    size,
}) => {
    return (
        <Button
            size={size}
            onClick={() => {
                onClick()
            }}
        >
            Generar Sitemap
        </Button>
    )
}

export default GenerarSitemapButton
