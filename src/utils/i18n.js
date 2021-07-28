const VueI18n = require("vue-i18n").default;
window.Vue = require("vue").default;

function globalLocaleMessages() {
  const locales = require.context("../lang", true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

const i18n = new VueI18n({
  locale: "vi",
  fallbackLocale: "vi",
  messages: globalLocaleMessages(),
});

export { i18n };
