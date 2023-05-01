import { IProductSchema } from '@/schemas/product.schema';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';

const ProductDetails = ({ product }: IProps) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        const loadImage = setTimeout(() => {
            setIsImageLoading(false);
        }, 2000);

        return () => clearTimeout(loadImage);
    }, []);

    return (
        <Fragment>
            <Head>
                <title>{product.name}</title>
            </Head>

            <Box
                sx={{
                    maxWidth: '30rem',
                    marginX: 'auto',
                    marginTop: '2rem',
                    userSelect: 'none',
                }}
            >
                <Box className="relative h-40">
                    <Image
                        priority
                        fill
                        src={product.url || ''}
                        alt={product.name}
                        sizes="350px"
                        style={{
                            objectFit: 'contain',
                            display: isImageLoading ? 'none' : 'block',
                        }}
                    />

                    <Skeleton
                        variant="rounded"
                        width={'100%'}
                        height={'100%'}
                        sx={{
                            display: isImageLoading ? 'block' : 'none',
                            marginX: 'auto',
                        }}
                    />
                </Box>

                <Typography className="product-title font-semibold mt-6">
                    {product.name}
                </Typography>

                <Typography variant="body2" className="text-gray-500 mt-1">
                    by {product.seller}
                </Typography>

                <Typography className="font-light text-justify my-4">
                    {product.description}
                </Typography>
            </Box>
        </Fragment>
    );
};

export default ProductDetails;

interface IProps {
    product: IProductSchema;
}
