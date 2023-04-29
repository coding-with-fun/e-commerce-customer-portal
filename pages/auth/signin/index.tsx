import PasswordInput from '@/components/PasswordInput';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { Fragment, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import schema from './schema';

const SignIn = () => {
    const [isDataSubmitting, setIsDataSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            setIsDataSubmitting(true);
            console.log(values);

            await signIn('credentials', {
                email: values.email,
                password: values.password,
                callbackUrl: 'http://localhost:3000',
            });
        },
    });

    return (
        <Fragment>
            <Head>
                <title>Sign In</title>
            </Head>

            <Box className="h-full flex flex-col items-center">
                <Typography component="h1" variant="h4" className="mt-12 mb-6">
                    Sign In
                </Typography>

                <Box
                    component="form"
                    noValidate
                    className="px-6 w-full max-w-sm"
                    onSubmit={formik.handleSubmit}
                >
                    <TextField
                        fullWidth
                        autoFocus
                        id="email"
                        label="Email"
                        variant="outlined"
                        margin="dense"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email === true &&
                            Boolean(formik.errors.email)
                        }
                        helperText={
                            formik.touched.email === true && formik.errors.email
                        }
                        disabled={isDataSubmitting}
                    />

                    <PasswordInput
                        fullWidth
                        id="password"
                        label="Password"
                        margin="dense"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        inputerror={{
                            touched: formik.touched.password,
                            helperText: formik.errors.password,
                        }}
                        disabled={isDataSubmitting}
                    />

                    {isDataSubmitting ? (
                        <Box className="flex flex-1 justify-center mt-6 mb-4">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Button
                            fullWidth
                            color="primary"
                            variant="contained"
                            type="submit"
                            className="mt-6 mb-4"
                            disabled={isDataSubmitting}
                        >
                            Sign In
                        </Button>
                    )}
                </Box>
            </Box>
        </Fragment>
    );
};

export default SignIn;
