/** @type {import('next').NextConfig} */
module.exports = {
    async rewrites() {
        return [
            {
                source: '/frontpage',
                destination: 'https://to-do-list14.vercel.app/api/sendMail',
            },
        ]
    },
};
// module.exports = nextConfig
