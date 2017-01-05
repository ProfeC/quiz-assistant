const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export const logStars = function(message) {
  console.info('**********');
  console.info(message);
  console.info('**********');
};

export default {
  port: env.PORT || 8080
};

// REF:  https://github.com/jscomplete/learn-fullstack-javascript/blob/v2.1-end/config.js
