const googleAuth = require('google-auth-library');

const scope = 'https://mail.google.com/';

const credentials = {
  web: {
    client_id: process.env.CLIENT_ID,
    project_id: process.env.PROJECT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: ['https://developers.google.com/oauthplayground'],
    javascript_origins: ['http://localhost:3000'],
  },
};

function getAuthorizeUrl(callback) {
  const oauth2Client = new googleAuth.OAuth2Client(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
  );
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope,
  });
  callback(null, authUrl);
}

const code = process.env.CODE;

function getAccessToken(callback) {
  const oauth2Client = new googleAuth.OAuth2Client(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
  );
  oauth2Client.getToken(code, (err, token) => {
    // eslint-disable-next-line no-console
    if (err) return console.log(err);
    return callback(null, token);
  });
}

const tokens = {
  access_token: process.env.ACCESS_TOKEN,
  refresh_token: process.env.REFRESH_TOKEN,
  scope: process.env.SCOPE,
  token_type: process.env.TOKEN_TYPE,
  expiry_date: process.env.EXPIRE_DATE,
};

module.exports = { credentials, tokens };
