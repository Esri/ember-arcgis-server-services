import Ember from 'ember';
import agoRequest from '../utils/request';
import { tryParseServiceUrl, tryParseServerUrl, parseType } from '../utils/parse-url';
import shouldAddTokenUtil from '../utils/should-add-token';

export default Ember.Mixin.create({
  init: function () {
    this._super(); // ensure a good citizen in the super chain
    this.set('shouldAddTokenCache', {});
  },

  session: Ember.inject.service(),

  hostAppConfig: Ember.computed(function () {
    return Ember.getOwner(this).resolveRegistration('config:environment');
  }),

  // TODO consider removing this at a major version
  parseServiceUrl: parseType,

  /**
   * Make an arbitrary request to the server
   */
  request (url, options = {}) {
    return this.shouldAddToken(url, this.get('session.portal'))
    .then(shouldAddToken => {
      if (shouldAddToken) {
        options.token = this.get('session.token');
      }
      options.method = options.method || 'GET';
      return agoRequest(url, options);
    });
  },
  /**
   * Given a url, determine if we should send along a token
   */
  shouldAddToken (url, portalInfo = {}) {
    const shouldAddTokenCache = this.get('shouldAddTokenCache');
    const key = tryParseServerUrl(url) || url;
    const cachedValue = shouldAddTokenCache[key];

    if (!Ember.isBlank(cachedValue)) {
      return Ember.RSVP.resolve(cachedValue);
    }

    return this.getAuthInfo(url)
      .then(authInfo => {
        const result = shouldAddTokenUtil(url, authInfo, portalInfo);
        shouldAddTokenCache[key] = result;
        return result;
      })
      .catch((err) => {
        Ember.debug(`Error occured checking authInfo for ${url}. Message: ${err}. Will not send token for ${key}`);
        shouldAddTokenCache[key] = false;
        return false;
      });
  },

  getServiceInfo (url, options) {
    Ember.deprecate('use .getLayerInfo(url, options).', false, {id: 'getServiceInfoDeprecation', until: '10.0.0'});
    return this.getLayerInfo(url, options);
  },

  getLayerInfo (url, options) {
    return this.request(url + '?f=json', options);
  },

  /**
  * Get the base server info
   */
  getServerInfo (url, options) {
    const serviceUrl = tryParseServiceUrl(url);
    let service = url;
    if (serviceUrl) {
      service = serviceUrl;
    }
    return this.request(`${service}?f=json`, options);
  },

  getAuthInfo (url, options) {
    let server = url;
    const serverUrl = tryParseServerUrl(url);
    if (serverUrl) {
      server = serverUrl;
    }
    // we want to never send a token for this one so we use agoRequest directly
    return agoRequest(`${server}/info?f=json`);
  }

});
