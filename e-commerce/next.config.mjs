/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ungrxmlu9usc52eq.public.blob.vercel-storage.com',
            },
        ],
    },
};

export default nextConfig;
