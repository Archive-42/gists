#!/usr/bin / env node
/*

chmod u+x gist-clone-all
./gist-clone-all username OAUTH_TOKEN
*/



// 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




var fs = require("fs"),
    https = require("https"),
    exec = require("child_process").exec;

// TODO --pull or --push

var user = process.argv[2],
    token = process.argv[3];

fetchAndClone(1, function callback(error, nextPage) {
  if (error) throw error;
  if (nextPage > 0) fetchAndClone(nextPage, callback);
});

function fetchAndClone(page, callback) {
  fetch(page, function(error, gists) {
    if (error) return callback(error);
    if (gists.length) ++page; else page = -1;
    cloneNext(gists.pop());

    function cloneNext(gist) {
      if (!gist) return callback(null, page);
      if (directoryExists(gist.id)) return cloneNext(gists.pop());
      console.log("cloning " + gist.id);
      exec("git clone git@gist.github.com:" + gist.id + ".git", function(error, stdout, stderr) {
        if (error) return callback(error);
        cloneNext(gists.pop());
      });
    }
  });
}

function fetch(page, callback) {
  var request = https.request({
    hostname: "api.github.com",
    port: 443,
    path: "/users/" + encodeURIComponent(user) + "/gists?page=" + page,
    method: "GET",
    headers: {
      "Accept": "application/vnd.github.v3+json",
      "Authorization": "token " + token,
      "User-Agent": "mbostock/gist-clone-all"
    }
  }, function(response) {
    var chunks = [];
    response.setEncoding("utf8");
    response.on("data", function(chunk) { chunks.push(chunk); });
    response.on("end", function() { callback(null, JSON.parse(chunks.join(""))); });
  });
  request.on("error", callback);
  request.end();
}

function directoryExists(path) {
  try {
    return fs.lstatSync(path).isDirectory();
  } catch (ignored) {
    return false;
  }
}
