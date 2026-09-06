import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: "/slide-ai-agent-terminal-integration/",
  plugins: [react(), tailwindcss()],
})
