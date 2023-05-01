import { IProductSchema } from '@/schemas/product.schema';
import Head from 'next/head';
import { Fragment } from 'react';

const ProductDetails = ({ product }: IProps) => {
    return (
        <Fragment>
            <Head>
                <title>{product.name}</title>
            </Head>

            <div>{product.name}</div>
        </Fragment>
    );
};

export default ProductDetails;

interface IProps {
    product: IProductSchema;
}
