import { Box } from '@mui/material';
import React from 'react';

const AppWrapper = ({ children }: IProps) => {
    return <Box className="h-screen">{children}</Box>;
};

export default AppWrapper;

interface IProps {
    children: JSX.Element[] | JSX.Element | null;
}
