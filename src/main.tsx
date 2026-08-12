import "flow-slide-engine/style.css"
import "./styles.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { Presentation } from "./Presentation"

const root = document.getElementById("root")
if (root === null) {
  throw new Error("index.html is missing its #root element")
}

createRoot(root).render(
  <StrictMode>
    <Presentation />
  </StrictMode>,
)
