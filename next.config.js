/** @type {import('next').NextConfig} */
module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/sendMail',
                destination: 'https://to-do-list14.vercel.app/api/sendMail',
            },
        ]
    },
};
// module.exports = nextConfig
