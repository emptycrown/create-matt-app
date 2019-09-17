// singular "master" server, contains cron jobs + anything else not the API
const reportSentry = e => {
  sentry.captureException(e);
  throw e;
};
process.on('unhandledRejection', reportSentry);

import { ENV, PROD } from '#/lib/env';
import { scheduleJobs } from '~/cron';
import sentry from '~/integrations/sentry';

if (ENV === PROD) {
  scheduleJobs();
}
