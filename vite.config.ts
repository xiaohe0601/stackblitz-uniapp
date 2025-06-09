import path from "node:path";
import process from "node:process";
import Uni from "@dcloudio/vite-plugin-uni";
import UniComponents from "@uni-helper/vite-plugin-uni-components";
import UniManifest from "@uni-helper/vite-plugin-uni-manifest";
import UniPages from "@uni-helper/vite-plugin-uni-pages";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";

function r(...paths: string[]) {
  return path.resolve(process.cwd(), ".", ...paths);
}

export default defineConfig({
  resolve: {
    alias: {
      "@": r("src")
    }
  },
  plugins: [
    AutoImport({
      dts: "types/auto-imports.d.ts",
      imports: [
        "vue",
        "uni-app"
      ],
      dirs: [
        "src/composables",
        "src/stores",
        "src/utils"
      ],
      vueTemplate: true
    }),
    UniComponents({
      dts: "types/components.d.ts",
      dirs: [
        "src/components"
      ],
      directoryAsNamespace: true,
      collapseSamePrefixes: true
    }),
    UniManifest(),
    UniPages({
      dts: "types/uni-pages.d.ts",
      dir: "src/pages",
      subPackages: [],
      exclude: [
        "**/components/**/*.*"
      ]
    }),
    // @ts-expect-error uni doesn't support esm
    Uni.default()
  ]
});