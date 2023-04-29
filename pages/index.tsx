import { Box, Button, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';

const Home = () => {
    const { data: session, update } = useSession();

    const handleUpdateUser = async () => {
        const newSession = {
            ...session,
            user: {
                ...session?.user,
                email: `someone@example.com ${Date.now()}`,
            },
        };

        await update(newSession);
    };

    return (
        <Box>
            <Typography>{JSON.stringify(session, null, 2)}</Typography>

            <Button variant="contained" onClick={handleUpdateUser}>
                Button
            </Button>
        </Box>
    );
};

export default Home;
