// File reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
// Clean reload: http://pm2.keymetrics.io/docs/usage/signals-clean-restart/

const defaultOptions = {
  wait_ready: true,
  // 5 seconds of startup time before receiving any HTTP requests
  listen_timeout: 5000,
  // Don't send SIGKILL for 10 seconds
  kill_timeout: 20000,
  // https://pm2.io/doc/en/runtime/features/restart-strategies/
  exp_backoff_restart_delay: 100,
};

module.exports = {
  apps: [
    {
      name: 'api',
      script: 'babelWrapper.js',
      env: {
        SCRIPT: 'apiServer',
        NODE_ENV: 'production',
      },
      instances: 2,
      ...defaultOptions,
    },
    {
      name: 'master',
      script: 'babelWrapper.js',
      env: {
        SCRIPT: 'masterServer',
        NODE_ENV: 'production',
      },
      instances: 1,
      ...defaultOptions,
    },
  ],
};
