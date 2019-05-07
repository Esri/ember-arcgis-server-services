/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/* jshint node: true */
'use strict';

module.exports = {
  name: require('./package').name,

  isDevelopingAddon: function () {
    return false;
  }
};
