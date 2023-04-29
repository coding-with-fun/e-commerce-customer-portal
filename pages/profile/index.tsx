import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import { Fragment } from 'react';

const Profile = () => {
    return (
        <Fragment>
            <Head>
                <title>Profile</title>
            </Head>

            <Box>
                <Typography>Profile</Typography>
            </Box>
        </Fragment>
    );
};

export default Profile;
