/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
          remotePatterns: [
            {
              protocol: "https",
              hostname: "umlwdospvvdauxzulbnu.supabase.co",
              port: "",
              pathname: "/storage/v1/object/public/images/**",
            },
            {
              protocol: "https",
              hostname: "umlwdospvvdauxzulbnu.supabase.co",
              port: "",
              pathname: "/storage/v1/object/public/products/**",
            },
            {
              protocol: "https",
              hostname: "umlwdospvvdauxzulbnu.supabase.co",
              port: "",
              pathname: "/storage/v1/object/public/categories/**",
            },
          ],
        },
};

export default nextConfig;
