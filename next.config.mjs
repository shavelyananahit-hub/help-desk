/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Թuylatrel env-y API routes-nerum (Allow env vars in API routes)
  env: {
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_PORT: process.env.DB_PORT || '5432',
    DB_NAME: process.env.DB_NAME || 'helpdesk',
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  },
  // Experimental — disable React Compiler to avoid issues with Sequelize
  experimental: {},
};

export default nextConfig;
