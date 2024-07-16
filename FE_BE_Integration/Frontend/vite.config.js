import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // here server will think we are on same port (i.e. same origin)
      // and hence NO CORS error
      // as server and localhost are on 3000
      "/api": "http://localhost:3000",
    },
  },
  plugins: [react()],
});
