const getOsEnv = (key: string) => {
    return process.env[key] || '';
};

const env = {
    auth: {
        secret: getOsEnv('JWT_SECRET'),
    },
};

export default env;
