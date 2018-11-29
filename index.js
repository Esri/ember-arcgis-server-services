/* Copyright (c) 2017-2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/* jshint node: true */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon: function () {
    return false;
  },

  included (/* app */) {
    this._super.included.apply(this, arguments);
    // bundle scripts from vendor folder
    this.import('vendor/@esri/arcgis-rest-request/request.umd.js');
    this.import('vendor/@esri/arcgis-rest-feature-service/feature-service.umd.js');
    this.import('vendor/shims/@esri/arcgis-rest-request.js');
    this.import('vendor/shims/@esri/arcgis-rest-feature-service.js');
  },

  treeForVendor (vendorTree) {
    var arcgisRequestTree = new Funnel(path.dirname(require.resolve('@esri/arcgis-rest-request/dist/umd/request.umd.js')), {
      files: ['request.umd.js', 'request.umd.js.map'],
      destDir: '@esri/arcgis-rest-request'
    });

    var arcgisFeatureServiceTree = new Funnel(path.dirname(require.resolve('@esri/arcgis-rest-feature-service/dist/umd/feature-service.umd.js')), {
      files: ['feature-service.umd.js', 'feature-service.umd.js.map'],
      destDir: '@esri/arcgis-rest-feature-service'
    });

    var treesToMerge = [
      arcgisRequestTree,
      arcgisFeatureServiceTree
    ];

    // if we got a vendorTree, and add it in
    if (vendorTree) {
      treesToMerge.unshift(vendorTree);
    }

    return new MergeTrees(treesToMerge);
  }
};
