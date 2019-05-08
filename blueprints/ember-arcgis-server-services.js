/* eslint-env node */
module.exports = {
  description: 'Install torii-provider-arcgis dependencies',

  normalizeEntityName() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  // locals(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall(/* options */) {
    // ensure peerDependencies are installed
    this.addPackagesToProject([
      { name: '@esri/arcgis-rest-auth', target: '^2.0.0' },
      { name: '@esri/arcgis-rest-feature-layer', target: '^2.0.0' },
      { name: '@esri/arcgis-rest-request', target: '^2.0.0' },
      { name: '@esri/arcgis-rest-types', target: '^2.0.0' }
    ]);
  }
};
