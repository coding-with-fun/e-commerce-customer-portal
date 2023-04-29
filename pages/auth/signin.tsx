import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignIn = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            await signIn('credentials', {
                email: values.email,
                password: values.password,
                callbackUrl:
                    (router.query.callbackUrl as string) ||
                    'http://localhost:3000/',
            });
        },
    });

    return (
        <Box>
            <Typography>Sign In</Typography>

            <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />

                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />

                <Button type="submit">Sign In</Button>
            </Box>

            <Button
                onClick={() => {
                    signOut();
                }}
            >
                Sign Out
            </Button>
        </Box>
    );
};

export default SignIn;
