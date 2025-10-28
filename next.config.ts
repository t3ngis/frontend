import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    HPI_Key:process.env.HPI_Key
  }
};

export default nextConfig;
