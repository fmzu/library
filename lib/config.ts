export const config = new Map([
  [
    "react",
    [
      "ui",
      "data",
      "hooks",
      "editor",
      "admin",
      "router",
      "form",
      "state",
      "testing",
      "animation",
      "component",
    ],
  ],
  ["vue", ["ui", "admin"]],
  ["angular", ["ui", "admin"]],
  ["nodejs", ["bun", "deno"]],
  ["bun", ["nodejs", "deno"]],
  ["deno", ["nodejs", "bun"]],
  ["nextjs", ["react", "ui", "admin"]],
  ["svelte", ["ui", "admin"]],
  ["solidjs", ["ui", "admin"]],
])
