/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Թuylatrel env-y API routes-nerum (Allow env vars in API routes)
  env: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
  },
  // Experimental — disable React Compiler to avoid issues with Sequelize
  experimental: {},
};

export default nextConfig;
