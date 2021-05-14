import Vue from "vue";

// Sentry
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
if (process.env.VUE_APP_INTEGRATIONS_LOGGING_SENTRY?.toString() !== ''
  && process.env.VUE_APP_INTEGRATIONS_LOGGING_SENTRY?.toString() !== 'INTEGRATION_SENTRY') {
  Sentry.init({
    dsn: process.env.VUE_APP_INTEGRATIONS_LOGGING_SENTRY,
    release: process.env.npm_package_version,
    integrations: [
      new VueIntegration({
        Vue,
        attachProps: true,
        logErrors: true,
      }),
    ]
  });
}

// LogRocket
// import LogRocket from "logrocket";
// LogRocket.init(process.env.VUE_APP_INTEGRATIONS_LOGGING_LOGROCKET || "");
