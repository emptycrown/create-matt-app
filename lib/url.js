import { ENV, PROD } from './env';

export const PORT = process.env.PORT;
export const PROTOCOL = ENV === PROD ? 'https' : 'http';
export const PUBLIC_HOSTNAME =
  ENV === PROD ? 'TODO (i.e. "camelot.ai", "encour.tv")' : 'localhost';
// i.e. google.com, or facebook.com, or localhost:8000, etc
export const PUBLIC_HOST =
  ENV === PROD ? PUBLIC_HOSTNAME : `${PUBLIC_HOSTNAME}:${PORT}`;
// i.e. https://google.com, https://facebook.com, http://localhost:8000
export const ROOT_URL = `${PROTOCOL}://${PUBLIC_HOST}`;
