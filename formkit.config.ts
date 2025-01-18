import { defaultConfig } from "@formkit/vue";
import { rootClasses } from "./formkit.theme.ts";
import { generateClasses } from "@formkit/themes";

export default defaultConfig({
  // theme: "genesis",
  config: {
    classes: generateClasses({
      global: {
        // applies to all input types
        outer: "text-red-300",
      },
      text: {
        // only applies to text input type
        outer: "bizz",
        input: "fizz",
        label: "text-red-400",
      },
      email: {
        // only applies to email input type
        outer: "bap",
        input: "text-slate-400",
        label: "text-red-400",
      },
    }),
    rootClasses,
  },
});
