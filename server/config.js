const env = process.env;

const nodeEnv = env.NODE_ENV || 'development';

const logStars = function(message) {
    console.info('**********');
    console.info(message);
    console.info('**********');
};

const defaults = {
    dbUri: 'mongodb://localhost:27017/quiz_assistant', //Mongo DB
    port: env.PORT || 8080,
    host: env.HOST || '0.0.0.0',
    get serverUrl() {
        return `http://${this.host}:${this.port}`;
    }
};

module.exports = function () {
  return defaults;
}
