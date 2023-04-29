import { CacheProvider, type EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import theme from '@/styles/theme';
import createEmotionCache from '@/utility/createEmotionCache';

import '@/styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

const App = ({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
}: CustomAppProps) => {
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
};

export default App;

export interface CustomAppProps
    extends AppProps<{
        session: Session;
    }> {
    emotionCache: EmotionCache;
}
