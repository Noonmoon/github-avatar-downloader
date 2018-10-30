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
  var parsd = JSON.parse(body);
  cb(err, parsd);





  });
};

var logger = function(error, data) {
  if (error) {
    console.log(error)
  }
  var urls = [];
  for (var objs in data) {
    var item = data[objs];
    urls.push(item['avatar_url'])
  }
  console.log(urls)
};

getRepoContributors('jquery', 'jquery', logger)






