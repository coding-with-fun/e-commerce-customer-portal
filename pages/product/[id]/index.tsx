import toast from '@/libs/toast';
import { ProductDetailsResponseType } from '@/pages/api/product/detail';
import env from '@/utility/env';
import { GetServerSideProps } from 'next';
import ProductNotFound from './ProductNotFound';
import ProductDetails from './ProductDetails';

const Product = ({ data: { product, message, success } }: IProps) => {
    if (!success) {
        toast(message);
        return <ProductNotFound />;
    }

    return <ProductDetails product={product} />;
};

export default Product;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params;

    if (!params) {
        return {
            props: {},
        };
    }

    const response = await fetch(
        `${env.baseURL}/api/product/detail?id=${params.id}`
    );
    const data: ProductDetailsResponseType = await response.json();

    return {
        props: {
            data,
        },
    };
};

interface IProps {
    data: ProductDetailsResponseType;
}
