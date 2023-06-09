import PasswordInput from '@/components/PasswordInput';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { signIn, SignInResponse } from 'next-auth/react';
import Head from 'next/head';
import { Fragment, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import unauthenticatedPage from '@/hooks/unauthenticatedPage';
import toast from '@/libs/toast';
import { useRouter } from 'next/router';
import schema from './schema';
import env from '@/utility/env';

const SignIn = () => {
    const {
        query: { callbackUrl },
        push,
    } = useRouter();

    const [isDataSubmitting, setIsDataSubmitting] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {
            setIsDataSubmitting(true);
            const response = (await signIn('credentials', {
                email: values.email,
                password: values.password,
                redirect: false,
            })) as SignInResponse;
            console.log(response);

            if (!response.ok) {
                toast(response.error || 'Something went wrong.');
                setIsDataSubmitting(false);
            }
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

export default unauthenticatedPage(SignIn);
