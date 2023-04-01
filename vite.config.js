// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        detailPage: resolve(__dirname, "/detail-post.html"),
        addEditPage: resolve(__dirname, "/add-edit-post.html"),
      },
    },
  },
});
