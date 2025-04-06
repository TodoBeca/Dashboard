import { Divider } from '@mui/material'
import { useAppSelector } from '@/store'

type DividerMainProps = {
    className?: string
}

const DividerMain = ({ className }: DividerMainProps) => {
    const themeColor = useAppSelector((state) => state.theme.themeColor)
    const primaryColorLevel = useAppSelector(
        (state) => state.theme.primaryColorLevel,
    )

    return (
        <div className={className}>
            <Divider
                sx={{
                    borderWidth: 1,
                    opacity: 1,
                }}
                className={`bg-${themeColor}-${primaryColorLevel}`}
            />
        </div>
    )
}

export default DividerMain
