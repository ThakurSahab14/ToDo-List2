/** @type {import('next').NextConfig} */
module.exports = {
    async rewrites() {
        return [
            {
                source: '/frontpage',
                destination: 'https://to-do-list2-blond.vercel.app/api/sendMail',
            },
        ]
    },
};
// module.exports = nextConfig
