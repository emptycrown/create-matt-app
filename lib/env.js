export const DEV = 'development';
export const TEST = 'testing';
export const PROD = 'production';
export const ENV = process.env.NODE_ENV;
if (![DEV, TEST, PROD].includes(ENV)) {
  throw new Error('env.NODE_ENV must be set');
}

export const WEB = 'web';
export const MOBILE = 'mobile';
export const SERVER = 'server';
export const PLATFORM = process.env.PLATFORM;
if (![WEB, MOBILE, SERVER].includes(PLATFORM)) {
  throw new Error('env.PLATFORM must be set');
}
