import ProductsList from '@/components/home/ProductsList';
import env from '@/utility/env';
import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { ProductListResponseType } from './api/product/list';

const Home = ({ data: { products } }: IProps) => {
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
    const response = await fetch(`${env.baseURL}/api/product/list`);
    const data: ProductListResponseType = await response.json();

    return {
        props: {
            data,
        },
    };
};

interface IProps {
    data: ProductListResponseType;
}
