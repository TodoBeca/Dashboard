import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineAcademicCap,
    HiOutlineUserGroup,
    HiOutlineHome,
    HiOutlineChatAlt2,
    HiOutlineGlobe,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    inicio: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    becas: <HiOutlineAcademicCap />,
    paises: <HiOutlineGlobe />,
    usuarios: <HiOutlineUserGroup />,
    asistenteIA: <HiOutlineChatAlt2 />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
}

export default navigationIcon
