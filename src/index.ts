"use strict";

import environment from "@/lib/environment.js";
import config from "@/lib/config.js";
import "@/lib/initialize.js";
import server from "@/lib/server.js";
import routes from "@/api/routes/index.js";
import logger from "@/lib/logger.js";

const startupTime = performance.now();

(async () => {
  logger.header();

  logger.info("<<<< qwen free server >>>>");
  logger.info("Version:", environment.package.version);
  logger.info("Process id:", process.pid);
  logger.info("Environment:", environment.env);
  logger.info("Service name:", config.service.name);

  server.attachRoutes(routes);
  await server.listen();

  config.service.bindAddress &&
    logger.success("Service bind address:", config.service.bindAddress);
})()
  .then(() =>
    logger.success(
      `Service startup completed (${Math.floor(performance.now() - startupTime)}ms)`
    )
  )
  .catch((err) => console.error(err));
