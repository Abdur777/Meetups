require('dotenv').config();
/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    ID: process.env.ID,
    PASS: process.env.PASS,
  },
};

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
