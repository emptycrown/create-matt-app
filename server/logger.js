import bunyan from 'bunyan';
const logger = bunyan.createLogger({
  name: 'server',
  level: process.env.LOG_LEVEL || 'info',
});
export default logger;
