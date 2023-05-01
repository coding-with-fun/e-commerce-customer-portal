import { IProduct } from '@/data/ProductsData';
import { useAppSelector } from '@/hooks/redux';
import { addToCart, removeFromCart } from '@/redux/slice/cart.slice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Product = ({ product }: IProps) => {
    const cartData = useAppSelector((state) => state.cart.cartData);
    const dispatch = useDispatch();

    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        const loadImage = setTimeout(() => {
            setIsImageLoading(false);
        }, 2000);

        return () => clearTimeout(loadImage);
    }, []);

    return (
        <Paper
            elevation={0}
            variant="outlined"
            sx={{
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                cursor: 'pointer',
                minHeight: '266px',
                minWidth: '337px',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    height: '10rem',
                }}
            >
                <Image
                    priority
                    fill
                    src={product.url}
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

            <Typography
                className="product-title"
                sx={{
                    marginTop: '1rem',
                    marginBottom: '0.5rem',
                    minHeight: '3rem',
                }}
            >
                {product.name}
            </Typography>
            <Typography variant="body2">by {product.seller}</Typography>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                        }}
                    >
                        <Rating
                            name="product-rating"
                            value={product.ratings}
                            precision={0.5}
                            readOnly
                        />

                        <Typography
                            sx={{
                                fontSize: '0.8rem',
                            }}
                        >
                            {product.totalRatings}
                        </Typography>
                    </Box>

                    <Typography>₹{product.price}</Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <IconButton
                        aria-label="removeFromCart"
                        className={
                            _.get(cartData[product._id], 'quantity', 0) === 0
                                ? 'disabled-cart-manipulation-button'
                                : 'cart-manipulation-button'
                        }
                        disabled={
                            _.get(cartData[product._id], 'quantity', 0) === 0
                        }
                        onClick={() => {
                            dispatch(
                                removeFromCart({
                                    _id: product._id,
                                })
                            );
                        }}
                    >
                        <RemoveIcon />
                    </IconButton>

                    <Typography
                        sx={{
                            cursor: 'text',
                            userSelect: 'none',
                        }}
                    >
                        {_.get(cartData[product._id], 'quantity', 0)}
                    </Typography>

                    <IconButton
                        aria-label="addToCart"
                        className={
                            _.get(cartData[product._id], 'quantity', 0) ===
                            product.quantity
                                ? 'disabled-cart-manipulation-button'
                                : 'cart-manipulation-button'
                        }
                        disabled={
                            _.get(cartData[product._id], 'quantity', 0) ===
                            product.quantity
                        }
                        onClick={() => {
                            dispatch(
                                addToCart({
                                    ...product,
                                })
                            );
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
};

export default Product;

interface IProps {
    product: IProduct;
}
