const env = {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL as string,

    auth: {
        secret: process.env.JWT_SECRET as string,
    },

    db: {
        uri: process.env.MONGOOSE_URI as string,
    },
};

export default env;
