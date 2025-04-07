import { cloneElement } from 'react'
import Avatar from '@/components/ui/Avatar'
import Logo from '@/components/template/Logo'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

interface SideProps extends CommonProps {
    content?: React.ReactNode
}

const Side = ({ children, content, ...rest }: SideProps) => {
    return (
        <div className="grid lg:grid-cols-3 h-full">
            <div
                className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
                style={{
                    backgroundImage: `url('/img/others/auth-cover-bg.jpeg')`,
                }}
            >
                {/* <Logo mode="dark" /> */}
                <div className="flex-1 flex justify-center items-center">
                    <p className="text-lg text-dark opacity-100 text-center max-w-xl">
                        En TodoBeca publicamos oportunidades académicas para
                        estudiar en el exterior o en tu país, con información
                        clara, filtros útiles y convocatorias actualizadas.
                        Además, ofrecemos asesoramiento personalizado para
                        ayudarte a preparar tu postulación: desde la elección de
                        becas hasta la revisión de cartas de motivación, armado
                        de CV y orientación en el proceso completo.
                    </p>
                </div>
                <span className="text-dark">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                </span>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children as React.ReactElement, {
                              ...rest,
                          })
                        : null}
                </div>
            </div>
        </div>
    )
}

export default Side
