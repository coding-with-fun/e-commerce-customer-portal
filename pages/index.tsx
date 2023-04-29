import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import { Fragment } from 'react';

const Home = () => {
    return (
        <Fragment>
            <Head>
                <title>Home</title>
            </Head>

            <Box>
                <Typography>Home</Typography>
            </Box>
        </Fragment>
    );
};

export default Home;
