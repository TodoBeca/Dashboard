import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'inicio',
        path: '/inicio',
        component: lazy(() => import('@/views/Inicio')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'becas',
        path: '/becas-view',
        component: lazy(() => import('@/views/demo/BecasView')),
        authority: [],
    },
    {
        key: 'paises',
        path: '/paises-view',
        component: lazy(() => import('@/views/demo/PaisesView')),
        authority: [],
    },
    {
        key: 'usuarios',
        path: '/usuarios-view',
        component: lazy(() => import('@/views/demo/UsuariosView')),
        authority: [],
    },
    {
        key: 'asistenteIA',
        path: '/asistenteIA-view',
        component: lazy(() => import('@/views/demo/AsistenteIA')),
        authority: [],
    },
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     component: lazy(() => import('@/views/demo/TerminalView')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item1',
    //     path: '/collapse-menu-item-view-1',
    //     component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
    //     authority: [],
    // },
    // {
    //     key: 'collapseMenu.item2',
    //     path: '/collapse-menu-item-view-2',
    //     component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.single',
    //     path: '/group-single-menu-item-view',
    //     component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item1',
    //     path: '/group-collapse-menu-item-view-1',
    //     component: lazy(
    //         () => import('@/views/demo/GroupCollapseMenuItemView1'),
    //     ),
    //     authority: [],
    // },
    // {
    //     key: 'groupMenu.collapse.item2',
    //     path: '/group-collapse-menu-item-view-2',
    //     component: lazy(
    //         () => import('@/views/demo/GroupCollapseMenuItemView2'),
    //     ),
    //     authority: [],
    // },
]
