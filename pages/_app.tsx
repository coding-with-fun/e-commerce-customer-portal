import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { CacheProvider, type EmotionCache } from '@emotion/react';
import type { Session } from 'next-auth';

import createEmotionCache from '@/utility/createEmotionCache';
import theme from '@/styles/theme';

import '@/styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

export default function App({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
}: CustomAppProps) {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <SessionProvider session={session} refetchOnWindowFocus={false}>
                    <main className="p-3">
                        <Component {...pageProps} />
                    </main>
                </SessionProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}

export interface CustomAppProps
    extends AppProps<{
        session: Session;
    }> {
    emotionCache: EmotionCache;
}
