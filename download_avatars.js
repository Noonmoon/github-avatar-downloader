var request = require('request');
var token = require('./SECRETS.js')
console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN
    }
  };

  request(options, function(err, response, body) {
    cb(err, body);
  });
};

var logger = function(error, data) {
  if (error) {
    console.log(error)
  } else {
    console.log(JSON.parse(data))
  }
};

getRepoContributors('jquery', 'jquery', logger)






