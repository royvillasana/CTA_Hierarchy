import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["sjvlqf-5173.csb.app"], // Allow localhost and example.com subdomains
  },
  plugins: [react()],
});
