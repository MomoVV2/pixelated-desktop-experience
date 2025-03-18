import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Development mode check is preserved but doesn't use componentTagger
    mode === 'development' && {
      name: 'development-mode',
      // This is a minimal placeholder plugin that just logs when in dev mode
      configResolved() {
        console.log('Running in development mode');
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));