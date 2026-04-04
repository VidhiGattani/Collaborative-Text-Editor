/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['bcryptjs', 'pg'],
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push({
      'bcryptjs': 'commonjs bcryptjs',
      'pg': 'commonjs pg'
    });
    return config;
  },
};

module.exports = nextConfig;
