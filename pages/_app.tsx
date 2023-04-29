import { CacheProvider, type EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import theme from '@/styles/theme';
import createEmotionCache from '@/utility/createEmotionCache';

import '@/styles/globals.css';
import AppWrapper from '@/HOC/AppWrapper';
import Navbar from '@/components/Navbar';

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
                    <AppWrapper>
                        <Navbar />

                        <main className="p-4">
                            <Component {...pageProps} />
                        </main>
                    </AppWrapper>
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
