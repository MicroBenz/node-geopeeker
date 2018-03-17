var fetch = require('node-fetch');

var GEOPEEKER_API_ENDPOINT = 'https://api.geopeeker.com/api/router';

var GeoPeeker = function (options) {
  this.publicKey = options.publicKey;
  this.privateKey = options.privateKey;
  this.options = Object.assign(
    {
      language: 'en',
      locations: ['singapore', 'brazil', 'virginia', 'california', 'ireland', 'australia', 'germany', 'india', 'sweden', 'uk', 'japan', 'canada'],
      resolutions: ['1280x800']
    },
    options
  );
}

GeoPeeker.prototype.peek = function (url) {
  return fetch(GEOPEEKER_API_ENDPOINT + '/peek', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(this.publicKey + ':' + this.privateKey).toString('base64'),
      Referer: 'https://geopeeker.com'
    },
    body: JSON.stringify(Object.assign(
      this.options,
      {
        url: url,
        get_render: true,
        get_dns: false,
        get_ip_and_ping: false,
        user_agent: null,
        render_delay: 1000
      }
    ))
  }).then(res => { 
    if (res.ok) {
      return res.json();
    }
    throw new Error(JSON.stringify(res));
  })
}

module.exports = GeoPeeker;
