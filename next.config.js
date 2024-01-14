/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/welcome', //Redirect the root path to /welcome
        permanent: true, 
      },
    ];
  },
};