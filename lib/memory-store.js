'use strict';
function MemoryStore(windowMs,reset) {
  var hits = {};
  var resetTime = {};

  this.time = function(key, cb) {
      if (resetTime[key]) {
          resetTime[key] = resetTime[key];
      } else {
          resetTime[key] = reset;
      }

      cb(null, resetTime[key]);
  };

  this.incr = function(key, cb) {
      if (hits[key]) {
          hits[key]++;
      } else {
          hits[key] = 1;
      }

      cb(null, hits[key]);
  };

  this.resetAll = function() {
      hits = {};
      resetTime = {};
  };

  // export an API to allow hits from one or all IPs to be reset
  this.resetKey = function(key) {
      delete hits[key];
      delete resetTime[key];
  };

  // simply reset ALL hits every windowMs
  setInterval(this.resetAll, windowMs).unref();
}

module.exports = MemoryStore;
