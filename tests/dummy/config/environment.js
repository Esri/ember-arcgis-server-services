/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // domainServiceUrl: 'http://servicesqa.arcgis.com/97KLIFOSt5CxbiRI/arcgis/rest/services/sitedomains/FeatureServer/0',
      // portalBaseUrl: 'https://qaext.arcgis.com', // 'https://www.arcgis.com', //
      // arcgisPortal: {
      //   domain: 'arcgis.com',
      //   env: 'qaext',
      //   maps: 'mapsqa',
      // }
    },
    torii: {
      sessionServiceName: 'session',
      providers: {
        'arcgis-oauth-bearer': {
          // apiKey: 'XFk8D7A6TMdFJSuW' // production
          apiKey: 'Ll5erY6niWgZS1eV' // qa
        }
      }
    }
  };

  ENV.torii.providers['arcgis-oauth-bearer'].portalUrl = ENV.APP.portalBaseUrl;

  if (environment === 'development') {
    // const env = 'dev';
    const env = 'qa';

    switch (env) {
      case 'qa':
        ENV.APP.domainServiceUrl = 'https://servicesqa.arcgis.com/97KLIFOSt5CxbiRI/arcgis/rest/services/sitedomains/FeatureServer/0';
        ENV.torii.providers['arcgis-oauth-bearer'].apiKey = 'Ll5erY6niWgZS1eV';
        break;
      default:
        ENV.APP.domainServiceUrl = 'https://servicesdev.arcgis.com/LjjARY1mkhxulWPq/arcgis/rest/services/sitedomains/FeatureServer/0';
        ENV.torii.providers['arcgis-oauth-bearer'].apiKey = 'ifq94vTWyyZclwNz';
    }

    ENV.torii.providers['arcgis-oauth-bearer'].portalUrl = `https://${env}ext.arcgis.com`;
  }

  if (environment === 'surge') {
    ENV.torii.providers['arcgis-oauth-bearer'].apiKey = 'ifq94vTWyyZclwNz';
    ENV.torii.providers['arcgis-oauth-bearer'].portalUrl = 'https://devext.arcgis.com';
    ENV.APP.domainServiceUrl = 'https://servicesdev.arcgis.com/LjjARY1mkhxulWPq/arcgis/rest/services/sitedomains/FeatureServer/0';
  }

  if (environment === 'github') {
    ENV.locationType = 'hash';
    ENV.rootURL = '/ember-arcgis-server-services/';
    ENV.torii.providers['arcgis-oauth-bearer'].apiKey = 'Ll5erY6niWgZS1eV';
    ENV.torii.providers['arcgis-oauth-bearer'].portalUrl = 'https://qaext.arcgis.com';
    ENV.APP.domainServiceUrl = 'https://servicesqa.arcgis.com/97KLIFOSt5CxbiRI/arcgis/rest/services/sitedomains/FeatureServer/0';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.locationType = 'hash';
    // ENV.rootURL = '/ember-arcgis-server-services/';
  }

  return ENV;
};
