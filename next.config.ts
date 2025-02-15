import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.wasm$/,
      type: "javascript/auto",
      loader: "file-loader",
      options: {
        publicPath: "static/",
        outputPath: "static/",
        name: "[name].[ext]",
      },
    });

    return config;
  },
  /* config options here */
  crossOrigin: "anonymous",
};

export default withNextIntl(nextConfig);
