const convict = require('convict');
 
// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 9002,
    env: 'PORT',
    arg: 'port'
  },
  googleMapsApiKey: {
    doc: 'Google maps api key',
    format: '*',
    default: '',
    env: 'GOOGLE_MAPS_API_KEY',
    sensitive: true
  },
  kmsFilePath: {
    doc: 'Path to KMS file having delvery addresses for outlets',
    format: '*',
    default: `${__dirname}/DeliveryAreas.kml`,
    env: 'KMS_FILE_PATH',
  },
});
 
// Load environment dependent configuration
const env = config.get('env');
config.loadFile('./config/' + env + '.json');
 
// Perform validation
config.validate({allowed: 'strict'});
 
module.exports = config;