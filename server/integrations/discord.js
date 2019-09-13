import { Client } from 'discord.js';
import { DEV, ENV, PROD } from '#/lib/env';
import assert from 'assert';
import logger from '~/logger';
import sentry from '~/integrations/sentry';

export const client = new Client();

// NB: Flip this to true if you'd like to test on dev
const botEnabled = ENV === PROD;

// Initialize discord Bot
export async function initializeBot() {
  if (!botEnabled) return;

  await client.login(process.env.DISCORD_BOT_TOKEN);
  logger.info(
    `Discord bot connected, logged in as: ${client.user.username} (${client.user.id})`
  );

  client.on('error', err => {
    console.error(err);
    sentry.captureMessage(err.message);
  });
}

export async function sendMessageToChannel(msg, channelId) {
  if (!botEnabled) {
    logger.warn(`Attempted to send Discord message: ${msg}`);
    return;
  }

  if (ENV === DEV) {
    channelId = CHANNEL_NAME_TO_ID['dev-bot'];
    msg = `[Intended Channel: ${channelId}]\n${msg}`;
  }
  return await client.channels.get(channelId).send(msg);
}

const CHANNEL_NAME_TO_ID = {
  //CMA-TODO
};
export async function sendMessageToInternalChannel(msg, channel = 'CMA-TODO') {
  const channelId = CHANNEL_NAME_TO_ID[channel];
  assert(channelId, 'Invalid channel name');
  return await sendMessageToChannel(msg, channelId);
}
