import { Box, Typography } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
    const { status } = useSession();

    return (
        <Box className="flex items-center p-4 shadow fixed top-0 w-screen z-50 bg-white">
            <Typography component="h1" variant="h6" className="cursor-pointer">
                <Link href="/">XMart</Link>
            </Typography>

            <Box className="flex-1" />

            <Box className="flex gap-3">
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
