/** @type {import('next').NextConfig} */
module.exports = {
    async rewrites() {
        return [
            {
                source: 'https://to-do-list14.vercel.app/frontpage',
                destination: 'https://to-do-list14.vercel.app/api/sendMail',
            },
        ]
    },
};
// module.exports = nextConfig
