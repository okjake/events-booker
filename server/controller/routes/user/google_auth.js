const googleAuth = require('google-auth-library');

const scope = 'https://mail.google.com/';

const credentials = {
  web: {
    client_id:
      '1060633768920-n4nhh73vpurc6qjbmh3vkr3c806u5lvn.apps.googleusercontent.com',
    project_id: 'events-booker',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: 'yRAzLTMj-lkestICZ42qOCAw',
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

const code =
  '4/0wHKIq1yVObo_KzASqW9M6Pn06G1loGHNCbA-j4lC_eHPf9UxUMTj7weZ0LktwHAxNEsSO12O6_jkwBoHz2htrE&scope=https://mail.google.com/ HTTP/1.1';

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
  access_token:
    'ya29.a0AfH6SMBpUzGMzYhdO32YZZskjiOjuWuEDQQVqowy_2hivWkzgxhyugKsj5FQi7QYAFc56B31_DAliTZPJPnJzlyZOW4evpS74ZykwN7ZkPGBrdOa6gqO7GSqdanB47SKgeCcxBsisczxm8Pu5CiSS0S2VivXjpTwXxM',
  refresh_token:
    '1//03gkKMJUuiL3CCgYIARAAGAMSNwF-L9IrBwcBc85JW02KA5npfqnrT9Lzd5K0eC2CNvo1qs30W02wLOUlg9ehThA_EUUL9_mETpM',
  scope: 'https://mail.google.com/',
  token_type: 'Bearer',
  expiry_date: 1591751464071,
};

module.exports = { credentials, tokens };
