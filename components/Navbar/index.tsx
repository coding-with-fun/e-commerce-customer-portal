import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { useMemo } from 'react';
import { emptyFavorites } from '@/redux/slice/cart.slice';
import { Box, Typography } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/router';

const Navbar = () => {
    const { status } = useSession();
    const dispatch = useDispatch();
    const { push } = useRouter();
    const cartData = useAppSelector((state) => state.cart.cartData);

    const totalCartQuantity = useMemo(() => {
        return Object.values(cartData).reduce(
            (prev, current) => prev + current.quantity,
            0
        );
    }, [cartData]);

    return (
        <Box className="flex items-center px-6 py-4 shadow fixed top-0 w-screen z-50 bg-white">
            <Typography component="h1" variant="h6" className="cursor-pointer">
                <Link href="/">XMart</Link>
            </Typography>

            <Box className="flex-1" />

            <Box className="flex gap-3">
                <Badge
                    badgeContent={totalCartQuantity}
                    onClick={() => {
                        push('/cart');
                    }}
                    sx={{
                        cursor: 'pointer',
                    }}
                    className="cart-badge"
                >
                    <ShoppingCartIcon
                        sx={{
                            color: '#002884',
                        }}
                    />
                </Badge>

                <Link href="/">Home</Link>

                {status === 'authenticated' ? (
                    <Link href="/profile">Profile</Link>
                ) : null}

                {status === 'unauthenticated' ? (
                    <Link href="/auth/signin">Sign In</Link>
                ) : null}

                {status === 'authenticated' ? (
                    <Typography
                        className="cursor-pointer"
                        onClick={() => {
                            signOut();
                            dispatch(emptyFavorites());
                        }}
                    >
                        Sign Out
                    </Typography>
                ) : null}
            </Box>
        </Box>
    );
};

export default Navbar;
