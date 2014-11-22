'use strict';

var child = require('child_process');
var which = require('which');
var assert = require('chai').assert;
var sinon = require('sinon');
var git = require('..');

describe('git with stubs', function () {

  after(function(){
    sinon.restore(child, 'exec'); 
  });

  it('calls `git()` and returns the sha of \'foo\'', function (d) {
    sinon.stub(child, 'exec', cbStub);

    function cbStub(cmd, cb) {
      assert.equal(cmd, 'git rev-parse HEAD');
      cb(null, 'fake sha');
    };

    git(function(err, sha){
      assert.isNull(err);
      assert.ok(child.exec.called, 'The child.exec method was called');
      assert.equal(sha, 'fake sha');
      d();
    });
  });
});


describe('git without stubs', function () {

  it('calls `git()` and returns the sha', function (d) {

    git(function(err, sha){
      assert.isNull(err);
      assert.isString(sha);
      d();
    });
  });
});
