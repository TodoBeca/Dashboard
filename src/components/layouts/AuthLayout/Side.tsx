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
                <div>
                    <div className="mb-6 flex items-center gap-4">
                        <Avatar
                            className="border-2 border-white"
                            shape="circle"
                            src="/img/avatars/alex-torriglia.jpg"
                        />
                        <div className="text-dark">
                            <div className="font-semibold text-base">
                                Alex Torriglia
                            </div>
                            <span className="opacity-100">
                                Co-Founder & CEO
                            </span>
                        </div>
                    </div>
                    <p className="text-lg text-dark opacity-100">
                        Xcoop es un joint venture internacional conformado por
                        compañías de servicios fintech, instituciones
                        financieras, proveedores de tecnología, unidos con el
                        fin de crear e impulsar servicios financieros
                        innovadores y disruptivos, a través de la creación del
                        primer ecosistema de pagos basado en el envío de remesas
                        de dinero desde, hacia y entre los países de América
                        latina.
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
