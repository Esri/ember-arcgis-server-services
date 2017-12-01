import Ember from 'ember';
import agoRequest from '../utils/request';
import { parseServiceUrl, parseServerUrl, parseType } from '../utils/parse-url';
import shouldAddToken from '../utils/should-add-token';

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

  shouldAddToken (url, portalInfo) {
    const shouldAddTokenCache = this.get('shouldAddTokenCache');
    const key = parseServerUrl(url);
    const cachedValue = shouldAddTokenCache[key];

    if (!Ember.isBlank(cachedValue)) {
      return Ember.RSVP.resolve(cachedValue);
    }

    return this.getAuthInfo(url)
    .then(authInfo => {
      const result = shouldAddToken(url, authInfo, portalInfo);
      shouldAddTokenCache[key] = result;
      return result;
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
    const service = parseServiceUrl(url);
    return this.request(`${service}?f=json`, options);
  },

  getAuthInfo (url, options) {
    const server = parseServerUrl(url);
    // we want to never send a token for this one so we use agoRequest directly
    return agoRequest(`${server}/info?f=json`);
  }

});
