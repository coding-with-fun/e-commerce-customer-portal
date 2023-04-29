import env from '@/utility/env';
import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { ProductListResponseType } from './api/product/list';

const Home = ({ products }: { products: ProductListResponseType }) => {
    console.log({
        products: products.products,
    });

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

export const getServerSideProps: GetServerSideProps = async () => {
    const data = await fetch(`${env.baseURL}/api/product/list`);
    const products: ProductListResponseType = await data.json();

    return {
        props: {
            products,
        },
    };
};
