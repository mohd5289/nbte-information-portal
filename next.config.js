/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["rb.gy"],
  },
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    largePageDataBytes: 128 * 100000,
  },
  optimizeFonts: true,
  optimizeFonts: {
    fonts: [
      {
        family: "Roboto",
        fileFormats: ["woff2"],
        fileFormatsFallback: ["woff"],
        preload: true,
        preloadFontFaces: true,
        path: "/fonts/roboto/", // Specify the path to the font files
      },
    ],
  },
};

module.exports = nextConfig;
