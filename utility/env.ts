const env = {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,

    auth: {
        secret: process.env.JWT_SECRET as string,
    },
};

export default env;
