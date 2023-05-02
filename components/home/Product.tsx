import Modal from '@/HOC/Modal';
import { useAppSelector } from '@/hooks/redux';
import {
    addToCart,
    removeFromCart,
    toggleFavorite,
} from '@/redux/slice/cart.slice';
import { IProductSchema } from '@/schemas/product.schema';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useSWRMutation from 'swr/mutation';
import SignInAlert from './SignInAlert';
import { toggleFavoriteAPI } from './api';

const Product = ({ product }: IProps) => {
    const { cartData, favoriteProducts } = useAppSelector(
        (state) => state.cart
    );
    const dispatch = useDispatch();
    const { status } = useSession();
    const router = useRouter();

    const { trigger } = useSWRMutation(
        '/api/product/favorite',
        toggleFavoriteAPI
    );

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [isSignInAlertOpen, setIsSignInAlertOpen] = useState(false);
    const [cleanSignInAlertContent, setCleanSignInAlertContent] =
        useState(false);

    const handleCloseSignInAlert = () => {
        setIsSignInAlertOpen(false);
    };

    const handleOpenSignInAlert = () => {
        setIsSignInAlertOpen(true);
    };

    const handleToggleFavorite = async () => {
        const response = await trigger({
            id: product._id,
        });
        console.log(response);

        dispatch(
            toggleFavorite({
                _id: product._id,
            })
        );
    };

    useEffect(() => {
        const loadImage = setTimeout(() => {
            setIsImageLoading(false);
        }, 2000);

        return () => clearTimeout(loadImage);
    }, []);

    return (
        <Fragment>
            <Paper
                elevation={0}
                variant="outlined"
                className="p-4 flex justify-center flex-col select-none"
                sx={{
                    minHeight: '266px',
                    minWidth: '337px',
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

                <Box
                    className="flex items-start justify-between mt-4 mb-1 gap-3"
                    sx={{
                        minHeight: '3rem',
                    }}
                >
                    <Typography
                        className="product-title font-semibold cursor-pointer hover:underline"
                        onClick={() => {
                            router.push(`/product/${product._id}`);
                        }}
                    >
                        {product.name}
                    </Typography>

                    <Box
                        className="cursor-pointer flex justify-center items-center"
                        onClick={() => {
                            if (status === 'unauthenticated') {
                                handleOpenSignInAlert();
                            } else {
                                handleToggleFavorite();
                            }
                        }}
                    >
                        {favoriteProducts.includes(product._id) ? (
                            <FavoriteOutlinedIcon className="text-red-600" />
                        ) : (
                            <FavoriteBorderOutlinedIcon />
                        )}
                    </Box>
                </Box>
                <Typography variant="body2" className="text-gray-500">
                    by {product.seller}
                </Typography>

                <Box className="flex items-center">
                    <Box className="flex-1">
                        <Box className="flex items-center gap-1">
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

                    <Box className="flex items-center gap-2">
                        <IconButton
                            aria-label="removeFromCart"
                            className={
                                _.get(cartData[product._id], 'quantity', 0) ===
                                0
                                    ? 'disabled-cart-manipulation-button'
                                    : 'cart-manipulation-button'
                            }
                            disabled={
                                _.get(cartData[product._id], 'quantity', 0) ===
                                0
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

                        <Typography className="cursor-text select-none">
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

            <Modal
                handleCloseModal={handleCloseSignInAlert}
                open={isSignInAlertOpen}
                setCleanModalContent={setCleanSignInAlertContent}
            >
                {cleanSignInAlertContent ? null : <SignInAlert />}
            </Modal>
        </Fragment>
    );
};

export default Product;

interface IProps {
    product: IProductSchema;
}
