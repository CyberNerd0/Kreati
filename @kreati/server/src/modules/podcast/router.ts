import { Hono } from "hono";

import { router as createRouter } from "./create";
import { router as endRouter } from "./end";
import { router as listRouter } from "./list";
import { router as startRouter } from "./start";

export default new Hono()
  .route("/", createRouter)
  .route("/", endRouter)
  .route("/", listRouter)
  .route("/", startRouter)
