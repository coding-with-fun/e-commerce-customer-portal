import ProductsList from '@/components/home/ProductsList';
import env from '@/utility/env';
import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { ProductListResponseType } from './api/product/list';
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const Home = ({ data: { products } }: IProps) => {
    console.log(products);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    let customerID = '';
    if (session) {
        customerID = session.user._id;
    }

    const response = await fetch(
        `${env.baseURL}/api/product/list?customerID=${customerID}`
    );
    const data: ProductListResponseType = await response.json();

    console.log(data, ' <<< PRODUCTS');

    return {
        props: {
            data,
        },
    };
};

interface IProps {
    data: ProductListResponseType;
}
