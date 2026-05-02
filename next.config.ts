import type { NextConfig } from "next";
import path from "node:path";

/**
 * Turbopack walks up until it finds ANY lockfile. A stray package-lock.json in a
 * parent folder (e.g. your home directory) makes Next infer the wrong project root,
 * which can crash Turbopack and spam GET / during recovery — see Next.js gh#92978.
 */
const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
