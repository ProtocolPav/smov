// vite.config.mts
import { defineConfig } from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/vitest@1.6.0_@types+node@20.16.5_jsdom@23.2.0_terser@5.33.0/node_modules/vitest/dist/config.js";
import react from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/@vitejs+plugin-react@4.3.1_vite@5.4.7_@types+node@20.16.5_terser@5.33.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import loadVersion from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/vite-plugin-package-version@1.1.0_vite@5.4.7_@types+node@20.16.5_terser@5.33.0_/node_modules/vite-plugin-package-version/dist/index.mjs";
import { VitePWA } from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/vite-plugin-pwa@0.17.5_vite@5.4.7_@types+node@20.16.5_terser@5.33.0__workbox-build@7.1.1_@typ_jqzivc6m4xtlong5vuiw6jelta/node_modules/vite-plugin-pwa/dist/index.js";
import checker from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/vite-plugin-checker@0.6.4_eslint@8.57.1_optionator@0.9.4_typescript@5.6.2_vite@5.4.7_@types+node@20.16.5_terser@5.33.0_/node_modules/vite-plugin-checker/dist/esm/main.js";
import path2 from "path";
import million from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/million@2.6.4_webpack-sources@3.2.3/node_modules/million/dist/packages/compiler.mjs";

// plugins/handlebars.ts
import { globSync } from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/glob@10.4.5/node_modules/glob/dist/esm/index.js";
import { viteStaticCopy } from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/vite-plugin-static-copy@1.0.6_vite@5.4.7_@types+node@20.16.5_terser@5.33.0_/node_modules/vite-plugin-static-copy/dist/index.js";
import Handlebars from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/handlebars@4.7.8/node_modules/handlebars/lib/index.js";
import path from "path";
var handlebars = (options = {}) => {
  const files = globSync("src/assets/**/**.hbs");
  function render(content) {
    const template = Handlebars.compile(content);
    return template(options?.vars ?? {});
  }
  return [
    {
      name: "hbs-templating",
      enforce: "pre",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          return render(html);
        }
      }
    },
    viteStaticCopy({
      silent: true,
      targets: files.map((file) => ({
        src: file,
        dest: "",
        rename: path.basename(file).slice(0, -4),
        // remove .hbs file extension
        transform: {
          encoding: "utf8",
          handler(content) {
            return render(content);
          }
        }
      }))
    })
  ];
};

// vite.config.mts
import { loadEnv, splitVendorChunkPlugin } from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/vite@5.4.7_@types+node@20.16.5_terser@5.33.0/node_modules/vite/dist/node/index.js";
import { visualizer } from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_@rollup+wasm-node@4.34.8/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import tailwind from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/tailwindcss@3.4.12/node_modules/tailwindcss/lib/index.js";
import rtl from "file:///C:/PycharmProjects/smov/node_modules/.pnpm/postcss-rtlcss@4.0.9_postcss@8.4.47/node_modules/postcss-rtlcss/esm/index.js";
var __vite_injected_original_dirname = "C:\\PycharmProjects\\smov";
var captioningPackages = [
  "dompurify",
  "htmlparser2",
  "subsrt-ts",
  "parse5",
  "entities",
  "fuse"
];
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_URL || "/",
    plugins: [
      million.vite({ auto: true, mute: true }),
      handlebars({
        vars: {
          opensearchEnabled: env.VITE_OPENSEARCH_ENABLED === "true",
          routeDomain: env.VITE_APP_DOMAIN + (env.VITE_NORMAL_ROUTER !== "true" ? "/#" : ""),
          domain: env.VITE_APP_DOMAIN,
          env
        }
      }),
      react({
        babel: {
          presets: [
            "@babel/preset-typescript",
            [
              "@babel/preset-env",
              {
                modules: false,
                useBuiltIns: "entry",
                corejs: {
                  version: "3.34"
                }
              }
            ]
          ]
        }
      }),
      VitePWA({
        disable: env.VITE_PWA_ENABLED !== "true",
        registerType: "autoUpdate",
        workbox: {
          maximumFileSizeToCacheInBytes: 4e6,
          // 4mb
          globIgnores: ["!assets/**/*"]
        },
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon.png",
          "safari-pinned-tab.svg"
        ],
        manifest: {
          name: "sudo-flix",
          short_name: "sudo-flix",
          description: "Watch your favorite shows and movies for free with no ads ever! (\u3063'\u30EE'c)",
          theme_color: "#120f1d",
          background_color: "#120f1d",
          display: "standalone",
          start_url: "/",
          icons: [
            {
              src: "android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            }
          ]
        }
      }),
      loadVersion(),
      checker({
        overlay: {
          position: "tr"
        },
        typescript: true,
        // check typescript build errors in dev server
        eslint: {
          // check lint errors in dev server
          lintCommand: "eslint --ext .tsx,.ts src",
          dev: {
            logLevel: ["error"]
          }
        }
      }),
      splitVendorChunkPlugin(),
      visualizer()
    ],
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {},
        manualChunks(id) {
          if (id.includes("@sozialhelden+ietf-language-tags") || id.includes("country-language")) {
            return "language-db";
          }
          if (id.includes("hls.js")) {
            return "hls";
          }
          if (id.includes("node-forge") || id.includes("crypto-js")) {
            return "auth";
          }
          if (id.includes("locales") && !id.includes("en.json")) {
            return "locales";
          }
          if (id.includes("react-dom")) {
            return "react-dom";
          }
          if (id.includes("Icon.tsx")) {
            return "Icons";
          }
          const isCaptioningPackage = captioningPackages.some((packageName) => id.includes(packageName));
          if (isCaptioningPackage) {
            return "caption-parsing";
          }
        }
      }
    },
    css: {
      postcss: {
        plugins: [tailwind(), rtl()]
      }
    },
    resolve: {
      alias: {
        "@": path2.resolve(__vite_injected_original_dirname, "./src"),
        "@sozialhelden/ietf-language-tags": path2.resolve(
          __vite_injected_original_dirname,
          "./node_modules/@sozialhelden/ietf-language-tags/dist/cjs"
        )
      }
    },
    test: {
      environment: "jsdom"
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIiwgInBsdWdpbnMvaGFuZGxlYmFycy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFB5Y2hhcm1Qcm9qZWN0c1xcXFxzbW92XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxQeWNoYXJtUHJvamVjdHNcXFxcc21vdlxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1B5Y2hhcm1Qcm9qZWN0cy9zbW92L3ZpdGUuY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlc3QvY29uZmlnXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgbG9hZFZlcnNpb24gZnJvbSBcInZpdGUtcGx1Z2luLXBhY2thZ2UtdmVyc2lvblwiO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcbmltcG9ydCBjaGVja2VyIGZyb20gXCJ2aXRlLXBsdWdpbi1jaGVja2VyXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IG1pbGxpb24gZnJvbSAnbWlsbGlvbi9jb21waWxlcic7XG5pbXBvcnQgeyBoYW5kbGViYXJzIH0gZnJvbSBcIi4vcGx1Z2lucy9oYW5kbGViYXJzXCI7XG5pbXBvcnQgeyBQbHVnaW5PcHRpb24sIGxvYWRFbnYsIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcblxuaW1wb3J0IHRhaWx3aW5kIGZyb20gXCJ0YWlsd2luZGNzc1wiO1xuaW1wb3J0IHJ0bCBmcm9tIFwicG9zdGNzcy1ydGxjc3NcIjtcblxuY29uc3QgY2FwdGlvbmluZ1BhY2thZ2VzID0gW1xuICBcImRvbXB1cmlmeVwiLFxuICBcImh0bWxwYXJzZXIyXCIsXG4gIFwic3Vic3J0LXRzXCIsXG4gIFwicGFyc2U1XCIsXG4gIFwiZW50aXRpZXNcIixcbiAgXCJmdXNlXCJcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiBlbnYuVklURV9CQVNFX1VSTCB8fCAnLycsXG4gICAgcGx1Z2luczogW1xuICAgICAgbWlsbGlvbi52aXRlKHsgYXV0bzogdHJ1ZSwgbXV0ZTogdHJ1ZSB9KSxcbiAgICAgIGhhbmRsZWJhcnMoe1xuICAgICAgICB2YXJzOiB7XG4gICAgICAgICAgb3BlbnNlYXJjaEVuYWJsZWQ6IGVudi5WSVRFX09QRU5TRUFSQ0hfRU5BQkxFRCA9PT0gXCJ0cnVlXCIsXG4gICAgICAgICAgcm91dGVEb21haW46XG4gICAgICAgICAgICBlbnYuVklURV9BUFBfRE9NQUlOICtcbiAgICAgICAgICAgIChlbnYuVklURV9OT1JNQUxfUk9VVEVSICE9PSBcInRydWVcIiA/IFwiLyNcIiA6IFwiXCIpLFxuICAgICAgICAgIGRvbWFpbjogZW52LlZJVEVfQVBQX0RPTUFJTixcbiAgICAgICAgICBlbnYsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIHJlYWN0KHtcbiAgICAgICAgYmFiZWw6IHtcbiAgICAgICAgICBwcmVzZXRzOiBbXG4gICAgICAgICAgICBcIkBiYWJlbC9wcmVzZXQtdHlwZXNjcmlwdFwiLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBcIkBiYWJlbC9wcmVzZXQtZW52XCIsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB1c2VCdWlsdEluczogXCJlbnRyeVwiLFxuICAgICAgICAgICAgICAgIGNvcmVqczoge1xuICAgICAgICAgICAgICAgICAgdmVyc2lvbjogXCIzLjM0XCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgVml0ZVBXQSh7XG4gICAgICAgIGRpc2FibGU6IGVudi5WSVRFX1BXQV9FTkFCTEVEICE9PSBcInRydWVcIixcbiAgICAgICAgcmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcbiAgICAgICAgd29ya2JveDoge1xuICAgICAgICAgIG1heGltdW1GaWxlU2l6ZVRvQ2FjaGVJbkJ5dGVzOiA0MDAwMDAwLCAvLyA0bWJcbiAgICAgICAgICBnbG9iSWdub3JlczogW1wiIWFzc2V0cy8qKi8qXCJdLFxuICAgICAgICB9LFxuICAgICAgICBpbmNsdWRlQXNzZXRzOiBbXG4gICAgICAgICAgXCJmYXZpY29uLmljb1wiLFxuICAgICAgICAgIFwiYXBwbGUtdG91Y2gtaWNvbi5wbmdcIixcbiAgICAgICAgICBcInNhZmFyaS1waW5uZWQtdGFiLnN2Z1wiLFxuICAgICAgICBdLFxuICAgICAgICBtYW5pZmVzdDoge1xuICAgICAgICAgIG5hbWU6IFwic3Vkby1mbGl4XCIsXG4gICAgICAgICAgc2hvcnRfbmFtZTogXCJzdWRvLWZsaXhcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJXYXRjaCB5b3VyIGZhdm9yaXRlIHNob3dzIGFuZCBtb3ZpZXMgZm9yIGZyZWUgd2l0aCBubyBhZHMgZXZlciEgKFx1MzA2MydcdTMwRUUnYylcIixcbiAgICAgICAgICB0aGVtZV9jb2xvcjogXCIjMTIwZjFkXCIsXG4gICAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjMTIwZjFkXCIsXG4gICAgICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXG4gICAgICAgICAgc3RhcnRfdXJsOiBcIi9cIixcbiAgICAgICAgICBpY29uczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzcmM6IFwiYW5kcm9pZC1jaHJvbWUtMTkyeDE5Mi5wbmdcIixcbiAgICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgICBwdXJwb3NlOiBcImFueVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3JjOiBcImFuZHJvaWQtY2hyb21lLTUxMng1MTIucG5nXCIsXG4gICAgICAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgICAgcHVycG9zZTogXCJhbnlcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNyYzogXCJhbmRyb2lkLWNocm9tZS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNyYzogXCJhbmRyb2lkLWNocm9tZS01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgICAgbG9hZFZlcnNpb24oKSxcbiAgICAgIGNoZWNrZXIoe1xuICAgICAgICBvdmVybGF5OiB7XG4gICAgICAgICAgcG9zaXRpb246IFwidHJcIixcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZXNjcmlwdDogdHJ1ZSwgLy8gY2hlY2sgdHlwZXNjcmlwdCBidWlsZCBlcnJvcnMgaW4gZGV2IHNlcnZlclxuICAgICAgICBlc2xpbnQ6IHtcbiAgICAgICAgICAvLyBjaGVjayBsaW50IGVycm9ycyBpbiBkZXYgc2VydmVyXG4gICAgICAgICAgbGludENvbW1hbmQ6IFwiZXNsaW50IC0tZXh0IC50c3gsLnRzIHNyY1wiLFxuICAgICAgICAgIGRldjoge1xuICAgICAgICAgICAgbG9nTGV2ZWw6IFtcImVycm9yXCJdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIHNwbGl0VmVuZG9yQ2h1bmtQbHVnaW4oKSxcbiAgICAgIHZpc3VhbGl6ZXIoKSBhcyBQbHVnaW5PcHRpb25cbiAgICBdLFxuXG4gICAgYnVpbGQ6IHtcbiAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7fSxcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkOiBzdHJpbmcpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJAc296aWFsaGVsZGVuK2lldGYtbGFuZ3VhZ2UtdGFnc1wiKSB8fCBpZC5pbmNsdWRlcyhcImNvdW50cnktbGFuZ3VhZ2VcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBcImxhbmd1YWdlLWRiXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcImhscy5qc1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiaGxzXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIm5vZGUtZm9yZ2VcIikgfHwgaWQuaW5jbHVkZXMoXCJjcnlwdG8tanNcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBcImF1dGhcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKFwibG9jYWxlc1wiKSAmJiAhaWQuaW5jbHVkZXMoXCJlbi5qc29uXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJsb2NhbGVzXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcInJlYWN0LWRvbVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwicmVhY3QtZG9tXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkljb24udHN4XCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJJY29uc1wiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBpc0NhcHRpb25pbmdQYWNrYWdlID0gY2FwdGlvbmluZ1BhY2thZ2VzLnNvbWUocGFja2FnZU5hbWUgPT4gaWQuaW5jbHVkZXMocGFja2FnZU5hbWUpKTtcbiAgICAgICAgICBpZiAoaXNDYXB0aW9uaW5nUGFja2FnZSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiY2FwdGlvbi1wYXJzaW5nXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgcGx1Z2luczogW3RhaWx3aW5kKCksIHJ0bCgpXSxcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgICBcIkBzb3ppYWxoZWxkZW4vaWV0Zi1sYW5ndWFnZS10YWdzXCI6IHBhdGgucmVzb2x2ZShcbiAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgXCIuL25vZGVfbW9kdWxlcy9Ac296aWFsaGVsZGVuL2lldGYtbGFuZ3VhZ2UtdGFncy9kaXN0L2Nqc1wiXG4gICAgICAgICksXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICB0ZXN0OiB7XG4gICAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuICAgIH0sXG4gIH07XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcUHljaGFybVByb2plY3RzXFxcXHNtb3ZcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcUHljaGFybVByb2plY3RzXFxcXHNtb3ZcXFxccGx1Z2luc1xcXFxoYW5kbGViYXJzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9QeWNoYXJtUHJvamVjdHMvc21vdi9wbHVnaW5zL2hhbmRsZWJhcnMudHNcIjtpbXBvcnQgeyBnbG9iU3luYyB9IGZyb20gXCJnbG9iXCI7XG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5J1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBIYW5kbGViYXJzIGZyb20gXCJoYW5kbGViYXJzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgY29uc3QgaGFuZGxlYmFycyA9IChvcHRpb25zOiB7IHZhcnM/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+IH0gPSB7fSk6IFBsdWdpbk9wdGlvbltdID0+IHtcbiAgY29uc3QgZmlsZXMgPSBnbG9iU3luYyhcInNyYy9hc3NldHMvKiovKiouaGJzXCIpO1xuXG4gIGZ1bmN0aW9uIHJlbmRlcihjb250ZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHRlbXBsYXRlID0gSGFuZGxlYmFycy5jb21waWxlKGNvbnRlbnQpO1xuICAgIHJldHVybiB0ZW1wbGF0ZShvcHRpb25zPy52YXJzID8/IHt9KTtcbiAgfVxuXG4gIHJldHVybiBbXG4gICAge1xuICAgICAgbmFtZTogJ2hicy10ZW1wbGF0aW5nJyxcbiAgICAgIGVuZm9yY2U6IFwicHJlXCIsXG4gICAgICB0cmFuc2Zvcm1JbmRleEh0bWw6IHtcbiAgICAgICAgb3JkZXI6ICdwcmUnLFxuICAgICAgICBoYW5kbGVyKGh0bWwpIHtcbiAgICAgICAgICByZXR1cm4gcmVuZGVyKGh0bWwpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgdGFyZ2V0czogZmlsZXMubWFwKGZpbGUgPT4gKHtcbiAgICAgICAgc3JjOiBmaWxlLFxuICAgICAgICBkZXN0OiAnJyxcbiAgICAgICAgcmVuYW1lOiBwYXRoLmJhc2VuYW1lKGZpbGUpLnNsaWNlKDAsIC00KSwgLy8gcmVtb3ZlIC5oYnMgZmlsZSBleHRlbnNpb25cbiAgICAgICAgdHJhbnNmb3JtOiB7XG4gICAgICAgICAgZW5jb2Rpbmc6ICd1dGY4JyxcbiAgICAgICAgICBoYW5kbGVyKGNvbnRlbnQ6IHN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIHJlbmRlcihjb250ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH0pXG4gIF1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1AsU0FBUyxvQkFBb0I7QUFDNVIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWlCO0FBQ3hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGFBQWE7QUFDcEIsT0FBT0EsV0FBVTtBQUNqQixPQUFPLGFBQWE7OztBQ05pUSxTQUFTLGdCQUFnQjtBQUM5UyxTQUFTLHNCQUFzQjtBQUUvQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFVBQVU7QUFFVixJQUFNLGFBQWEsQ0FBQyxVQUEwQyxDQUFDLE1BQXNCO0FBQzFGLFFBQU0sUUFBUSxTQUFTLHNCQUFzQjtBQUU3QyxXQUFTLE9BQU8sU0FBeUI7QUFDdkMsVUFBTSxXQUFXLFdBQVcsUUFBUSxPQUFPO0FBQzNDLFdBQU8sU0FBUyxTQUFTLFFBQVEsQ0FBQyxDQUFDO0FBQUEsRUFDckM7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TUFBTTtBQUFBLGNBQ04sU0FBUztBQUFBLFlBQ1g7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsWUFBWTtBQUFBLE1BQ1osUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsVUFBVTtBQUFBLFFBQ1o7QUFBQSxRQUNBLFlBQVk7QUFBQTtBQUFBLFFBQ1osUUFBUTtBQUFBO0FBQUEsVUFFTixhQUFhO0FBQUEsVUFDYixLQUFLO0FBQUEsWUFDSCxVQUFVLENBQUMsT0FBTztBQUFBLFVBQ3BCO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsdUJBQXVCO0FBQUEsTUFDdkIsV0FBVztBQUFBLElBQ2I7QUFBQSxJQUVBLE9BQU87QUFBQSxNQUNMLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxRQUNiLFFBQVEsQ0FBQztBQUFBLFFBQ1QsYUFBYSxJQUFZO0FBQ3ZCLGNBQUksR0FBRyxTQUFTLGtDQUFrQyxLQUFLLEdBQUcsU0FBUyxrQkFBa0IsR0FBRztBQUN0RixtQkFBTztBQUFBLFVBQ1Q7QUFDQSxjQUFJLEdBQUcsU0FBUyxRQUFRLEdBQUc7QUFDekIsbUJBQU87QUFBQSxVQUNUO0FBQ0EsY0FBSSxHQUFHLFNBQVMsWUFBWSxLQUFLLEdBQUcsU0FBUyxXQUFXLEdBQUc7QUFDekQsbUJBQU87QUFBQSxVQUNUO0FBQ0EsY0FBSSxHQUFHLFNBQVMsU0FBUyxLQUFLLENBQUMsR0FBRyxTQUFTLFNBQVMsR0FBRztBQUNyRCxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxjQUFJLEdBQUcsU0FBUyxXQUFXLEdBQUc7QUFDNUIsbUJBQU87QUFBQSxVQUNUO0FBQ0EsY0FBSSxHQUFHLFNBQVMsVUFBVSxHQUFHO0FBQzNCLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGdCQUFNLHNCQUFzQixtQkFBbUIsS0FBSyxpQkFBZSxHQUFHLFNBQVMsV0FBVyxDQUFDO0FBQzNGLGNBQUkscUJBQXFCO0FBQ3ZCLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLFFBQ1AsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFBQSxNQUM3QjtBQUFBLElBQ0Y7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUtDLE1BQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsUUFDcEMsb0NBQW9DQSxNQUFLO0FBQUEsVUFDdkM7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxNQUFNO0FBQUEsTUFDSixhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgInBhdGgiXQp9Cg==
