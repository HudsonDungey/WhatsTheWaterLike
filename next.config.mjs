/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'whatsthewaterlike.s3.ap-southeast-2.amazonaws.com', 
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com', 
            pathname: '**',
          },
        ],
      },
};

export default nextConfig;
