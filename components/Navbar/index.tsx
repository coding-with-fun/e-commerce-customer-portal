import { Box, Typography } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
    return (
        <Box className="flex items-center p-4 shadow">
            <Typography component="h1" variant="h6" className="cursor-pointer">
                <Link href="/">XMart</Link>
            </Typography>

            <Box className="flex-1" />

            <Box className="flex gap-3">
                <Link href="/">Home</Link>

                <Link href="/profile">Profile</Link>

                <Link href="/signin">Sign In</Link>

                <Typography className="cursor-pointer">Sign Out</Typography>
            </Box>
        </Box>
    );
};

export default Navbar;
