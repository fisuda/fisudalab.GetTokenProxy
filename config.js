var config = {}

config.keyrock_url = (process.env.KEYROCK_URL || 'https://keyrock/oauth2/token');
config.port = (process.env.PORT || 3000 );
config.client_id = process.env.CLIENT_ID;
config.client_secret = process.env.CLIENT_SECRET;
config.path = (process.env.PATH || '/token');

module.exports = config;
