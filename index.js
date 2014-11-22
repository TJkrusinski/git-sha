'use strict';

var child = require('child_process');
var which = require('which');

/**
 *  Expose `git`
 */

module.exports = git;

/**
 *  Get the git sha of the current commit
 *
 *  @param {Function} cb
 */

function git(cb) {
  which('git', function(err, data){
    if (err) return cb(err, data);
    
    child.exec('git rev-parse HEAD', cb);
  });
};
