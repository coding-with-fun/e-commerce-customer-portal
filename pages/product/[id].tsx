import env from '@/utility/env';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ProductDetailsResponseType } from '../api/product/detail';
import toast from '@/libs/toast';

const Product = ({ data: { product, message, success } }: IProps) => {
    const router = useRouter();

    const { id } = router.query;

    if (!success) {
        toast(message);
        return <div>Product not found.</div>;
    }

    return (
        <div>
            Product
            {id}
        </div>
    );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const params = context.params;

    if (!params) {
        return {
            props: {
                data: {
                    success: false,
                    message: 'Product ID not defined.',
                    product: {},
                },
            },
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
