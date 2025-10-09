// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isDevelopment = process.env.NODE_ENV === "development";

Sentry.init({
  dsn: "https://bab2171a70aff71e2a82d8c024cb429e@o4510130781814784.ingest.us.sentry.io/4510130813796352",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Disable replay in development to avoid hot-reload issues
  replaysOnErrorSampleRate: isDevelopment ? 0 : 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: isDevelopment ? 0 : 0.1,

  // Only enable Session Replay in production to avoid duplicate instance errors during hot reload
  integrations: isDevelopment
    ? []
    : [
        Sentry.replayIntegration({
          // Additional Replay configuration goes in here, for example:
          maskAllText: true,
          blockAllMedia: true,
        }),
      ],
});
