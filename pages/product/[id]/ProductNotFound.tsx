import NotFound from '@/public/assets/icons/noResults.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

const ProductNotFound = () => {
    const { replace } = useRouter();

    const handleGoToHome = () => {
        replace('/');
        return;
    };

    return (
        <Fragment>
            <Head>
                <title>Not found</title>
            </Head>

            <Box className="h-full flex flex-col justify-center items-center gap-6">
                <Image
                    priority
                    src={NotFound}
                    alt="Not found"
                    width={110}
                    height={110}
                />

                <Typography component="h1" variant="h4">
                    Product not found!
                </Typography>

                <Button variant="outlined" onClick={handleGoToHome}>
                    Go back to home
                </Button>
            </Box>
        </Fragment>
    );
};

export default ProductNotFound;
