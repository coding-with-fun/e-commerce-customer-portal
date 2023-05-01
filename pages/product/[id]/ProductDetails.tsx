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
                    maxWidth: '70%',
                    marginX: 'auto',
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

                <Box>
                    <Typography>{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                </Box>
            </Box>
        </Fragment>
    );
};

export default ProductDetails;

interface IProps {
    product: IProductSchema;
}
