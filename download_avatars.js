var request = require('request');
var fs = require('fs')
var token = require('./SECRETS.js')

console.log('Welcome to the GitHub Avatar Downloader!');

//makes a request for json, retrieves array of contributors
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };
  request(options, function(err, response, body) {
  var parsd = JSON.parse(body);
  cb(err, parsd);
  });
};

//data from getrepocon is passed to be looped through for gathering url and file path
var logger = function(error, data) {
  if (error) {
    console.log(error)
  }
  var urls = [];
  for (var objs in data) {
    var item = data[objs];
    downloadImageByURL(item['avatar_url'], item.login);
  }
};

//creates file from specific urls and login given from logger
function downloadImageByURL(url, filePath) {
  request.get(url)
         .on('error', function(err) {
          throw err;
         })
         .on('response', function(response) {
           if (response.statusCode !== 200) {
             console.log('Response Status Code: ', response.statusCode);
           };
         })
         .pipe(fs.createWriteStream(`./avatars/${filePath}.jpg`));
};
