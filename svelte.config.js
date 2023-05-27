import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";
import sveltePreprocess from "svelte-preprocess";
import postcssGlobalData from "@csstools/postcss-global-data";
import postcssPresetEnv from "postcss-preset-env";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    sveltePreprocess({
      postcss: {
        plugins: [
          postcssGlobalData({
            files: [
              "src/assets/styles/media-queries.css",
            ],
          }),
          postcssPresetEnv({
            stage: 0,
            features: {
              "nesting-rules": true,
            },
            browsers: "last 2 versions",
          }),
        ],
      },
    }),
  ],
  
  kit: {
    adapter: adapter(),

    // This alias is necessary so your app will resolve the following
    // import statements in your Fanny Pack components properly:
    // import { defaults } from "/src/defaults";
    alias: {
      "/src": "src",
    },
  },
};

export default config;
