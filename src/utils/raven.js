import config from "../config";
import Raven from "ravenjs";

export default Raven.config(config.service.configSentry, {
  environment: config.base.environment,
}).install();
