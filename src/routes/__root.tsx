/// <reference types="vite/client" />
import type {ReactNode} from 'react'
import {
    createRootRouteWithContext,
    ErrorComponent,
    HeadContent,
    Outlet,
    Scripts
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {NotFound} from "../pages/NotFound.tsx";
import normalizeCss from "../styles/normalize.css?url"
import appCss from "../styles/app.css?url"
import type {QueryClient} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

interface Context {
    queryClient: QueryClient
}

export const Route = createRootRouteWithContext<Context>()({
    head: () => ({
        meta: [
            {title: "IonasFit"},
            {charSet: 'utf-8'},
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1.0',
            },
            {
                name: 'apple-mobile-web-app-title',
                content: 'IonasFit',
            },
        ],

        links: [
            { rel: 'stylesheet', href: appCss },
            { rel: 'stylesheet', href: normalizeCss },

            {
                rel: 'icon',
                type: 'image/png',
                sizes: '96x96',
                href: '/favicon-96x96.png',
            },
            {
                rel: 'icon',
                type: 'image/svg+xml',
                href: '/favicon.svg',
            },
            {
                rel: 'shortcut icon',
                href: '/favicon.ico',
            },
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png',
            },
            {
                rel: 'manifest',
                href: '/site.webmanifest',
            },
        ],
    }),
    notFoundComponent: () => <NotFound/>,
    component: RootComponent,
    errorComponent: ErrorComponent,

})



function RootComponent() {
    return (
        <RootDocument>
            <Outlet/>
        </RootDocument>
    )
}

function RootDocument({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <head>
            <HeadContent/>
        </head>
        <body>
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />

        <Scripts/>
        </body>
        </html>
    )
}

