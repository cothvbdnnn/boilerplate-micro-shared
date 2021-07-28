const dayjs = require("dayjs").default;

/**
 * 10000 => "10.000"
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, "."));
}

/**
 * Upper case first char
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

/**
 * Get current datetime
 */
export function now(timestamp = true) {
  if (timestamp) {
    return dayjs().unix();
  }
  return dayjs();
}

/**
 * Format datetime from timestamp
 */
export function formatDateTime(datetime, format = "HH:mm DD-MM-YYYY") {
  return dayjs(datetime).format(format);
}
