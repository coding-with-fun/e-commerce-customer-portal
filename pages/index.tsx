import env from '@/utility/env';
import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { ProductListResponseType } from './api/product/list';
import ProductsList from '@/components/home/ProductsList';

const Home = ({ products: { products } }: IProps) => {
    return (
        <Fragment>
            <Head>
                <title>Home</title>
            </Head>

            <Box>
                <ProductsList products={products} />
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

interface IProps {
    products: ProductListResponseType;
}
