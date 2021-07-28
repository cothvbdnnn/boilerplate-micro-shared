import Raven from "ravenjs";
const dayjs = require("dayjs").default;
import config from "../config";
import { now, formatDateTime } from "./filters";
import { i18n } from "./i18n";

const bizflyUI = require("bizfly-ui").default;
const { Notification } = bizflyUI;

export function handleResponseErrorMessage(err) {
  if (err.response === undefined) {
    Raven.captureException(
      `Time: ${formatDateTime(now(), "DD/MM/YYYY HH:mm:ss")} - Error: ${err} `
    );
    return err;
  }

  let message = "";

  if (err.response.status === 401) {
    window.location.href = `${config.base.ssoUrl}/logout?service=${window.location.href}`;
  } else if (err.response.status === 500) {
    message = i18n.t("errors.internal_server"); // 'Lỗi hệ thống!'
    Raven.captureException(
      `Lỗi 500 - Time: ${formatDateTime(
        dayjs().unix(),
        "DD/MM/YYYY HH:mm:ss"
      )} - Error: ${err} `
    );
  } else if (err.response.status === 502) {
    message = i18n.t("errors.bad_gateway"); // 'Hệ thống đang bảo trì!'
    Raven.captureException(
      `Lỗi 502 - Time: ${formatDateTime(
        dayjs().unix(),
        "DD/MM/YYYY HH:mm:ss"
      )} - Error: ${err} `
    );
  } else if (err.response.status === 504) {
    message = i18n.t("errors.gateway_timeout"); // 'Không thể truy cập đến máy chủ!'
    Raven.captureException(
      `Lỗi 502 - Time: ${formatDateTime(
        dayjs().unix(),
        "DD/MM/YYYY HH:mm:ss"
      )} - Error: ${err} `
    );
  } else {
    try {
      message = err.response.message || err.response.data.message;
    } catch (error) {
      message = i18n.t("errors.internal_server"); // 'Lỗi hệ thống!'
      Raven.captureException(
        `Lỗi - Time: ${formatDateTime(
          dayjs().unix(),
          "DD/MM/YYYY HH:mm:ss"
        )} - Error: ${err} `
      );
    }
  }

  Notification.error({
    title: i18n.t("errors.title"), // 'Lỗi'
    customClass: "error",
    message,
  });

  return err;
}
