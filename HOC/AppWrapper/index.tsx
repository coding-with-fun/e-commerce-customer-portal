import { Box, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

const AppWrapper = ({ children }: IProps) => {
    const { data: session, status } = useSession();

    useEffect(() => {
        console.log('--------------------------------------------');
        console.log('Session data is');
        console.log({
            session,
        });
        console.log('--------------------------------------------');
    }, [session]);

    if (status === 'loading') {
        return <PageLoader />;
    }

    return <Box className="h-screen">{children}</Box>;
};

export default AppWrapper;

interface IProps {
    children: JSX.Element[] | JSX.Element | null;
}

export const PageLoader = () => {
    return (
        <Box className="h-screen flex justify-center items-center">
            <CircularProgress />
        </Box>
    );
};
