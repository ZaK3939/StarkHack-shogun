import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import react from "@vitejs/plugin-react";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react(), wasm(), topLevelAwait()],
    server: {
        port: 1395,
    },
    build: {
        rollupOptions: {
            output: {
            manualChunks(id) {
                if (id.includes('node_modules')) {
                if (id.includes('react')) {
                    return 'react';
                } else if (id.includes('phaser')) {
                    return 'phaser';
                } else if (id.includes('lodash')) {
                    return 'lodash';
                } else if (id.includes('other-large-lib')) {
                    return 'other-large-lib';
                } else {
                    return 'vendor';
                }
                }
            }
            }
        },
    chunkSizeWarningLimit: 1500, 
    }
});

