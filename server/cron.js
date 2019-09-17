// https://www.npmjs.com/package/node-schedule
import { sendMessageToInternalChannel } from '~/integrations/discord';
import bluebird from 'bluebird';
import childProcess from 'child_process';
import logger from '~/logger';
import nodeSchedule from 'node-schedule';
import sentry from '~/integrations/sentry';

const exec = bluebird.promisify(childProcess.exec, { multiArgs: true });

const JOBS = [
  {
    name: 'renewSSL',
    description: `Every day, try to renew SSL certificates if ready`,
    schedule: '00 00 00 * * *',
    fn: () => exec('sudo certbot renew'),
  },
  {
    name: 'checkDiskUsage',
    description: `Every day, check if disk space near full`,
    schedule: '00 00 00 * * *',
    fn: async () => {
      let [percentFull, _] = await exec(
        `df -H | grep -E '/dev/nvme0n1p1'  | awk '{ print $5 }' | cut -d'%' -f1`
      );
      percentFull = parseInt(percentFull);
      sentry.captureMessage(`Server disk space ${percentFull}% full`);
    },
  },
];

export function scheduleJobs() {
  JOBS.forEach(job => {
    const { name, description, schedule, fn } = job;
    nodeSchedule.scheduleJob(schedule, async () => {
      const msg = `About to run: ${name} -- ${description}`;
      sendMessageToInternalChannel(msg, 'CMA-TODO');
      logger.info(msg);
      try {
        await fn();
      } catch (err) {
        sentry.captureException(err);
      }
    });
  });
}
