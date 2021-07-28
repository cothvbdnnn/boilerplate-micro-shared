const ENV = {
  dev: {},
  staging: {},
  manage: {},
};

const currentHost = window.location.host;
const currentService =
  window.location.pathname.split("/").filter(Boolean)[0] || "dashboard";

const subDomain = currentHost.split(".")[0];

let currentEnvironment = "";
let currentRegion = "";

if (subDomain.split("-").length > 1) {
  currentRegion = subDomain.split("-")[0];
  currentEnvironment = subDomain.split("-")[1];
} else if (
  subDomain.split("-").length == 1 &&
  Object.keys(ENV).includes(subDomain)
) {
  currentEnvironment = subDomain;
} else {
  currentEnvironment = "manage";
  currentRegion = subDomain;
}

currentEnvironment =
  currentEnvironment === "local" ? process.env.APP_ENV : currentEnvironment; // eslint-disable-line

const config = {};

const { services } = (config.base = ENV[currentEnvironment]);

if (services[currentService][currentRegion]) {
  config.service = services[currentService][currentRegion];
  config.service.region = currentRegion;
} else {
  config.service = services[currentService];
}

config.base.environment = currentEnvironment;

config.otherServices = {};

Object.keys(services).forEach((service) => {
  if (service !== currentService) {
    if (services[service][currentRegion]) {
      config.otherServices[service] = services[service][currentRegion];
    } else {
      config.otherServices[service] = services[service];
    }
  }
});

delete config.base.services;

export default config;
