/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/product',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
