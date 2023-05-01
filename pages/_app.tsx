import store, { persistor } from '@/redux/store';
import { CacheProvider, type EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import AppWrapper from '@/HOC/AppWrapper';
import Navbar from '@/components/Navbar';
import theme from '@/styles/theme';
import createEmotionCache from '@/utility/createEmotionCache';

import '@/styles/globals.css';

// External CSS
import 'react-toastify/dist/ReactToastify.css';

const clientSideEmotionCache = createEmotionCache();

const App = ({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
}: CustomAppProps) => {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <CssBaseline />

                        <SessionProvider
                            session={session}
                            refetchOnWindowFocus={false}
                        >
                            <AppWrapper>
                                <Navbar />

                                <ToastContainer
                                    position="top-right"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                    theme="light"
                                />

                                <main className="p-4 pt-20 h-full">
                                    <Component {...pageProps} />
                                </main>
                            </AppWrapper>
                        </SessionProvider>
                    </PersistGate>
                </Provider>
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
