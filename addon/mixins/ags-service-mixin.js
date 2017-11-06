import Ember from 'ember';
import agoRequest from '../utils/request';
import { parseServerUrl, parseType } from '../utils/parse-url';
import shouldAddToken from '../utils/should-add-token';

export default Ember.Mixin.create({
  init: function () {
    this._super(); // ensure a good citizen in the super chain
  },

  infoCache: new Map(),

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
    debugger;
    options.method = options.method || 'GET';

    const token = this.get('session.token');
    if (!token) return agoRequest(url, options);

    this.getAuthInfo(url)
    .then(info => {
      debugger;
      if (info.owningSystemUrl === this.get('session.portal.portalHostname')) {
        options.token = this.get('session.token');
      }

      return agoRequest(url, options);
    });
  },

  /**
   * Get the service info
   * TODO what's using this? can it be removed?
   */
  getServiceInfo (url, options) {
    return this.request(url + '?f=json', options);
  },

  /**
   * Get authentication info
   */
  getAuthInfo (url) {
    const authInfoUrl = url.match(/.+\/rest\/(?=services)/) + 'info?f=json';
    const cached = this.get(`infoCache.${url}`);
    if (cached) {
      return Promise.resolve(cached);
    } else {
      return agoRequest(authInfoUrl);
    }
  },

  /**
  * Get the base server info
   */
  getServerInfo (url, options) {
    const server = parseServerUrl(url);
    return this.request(`${server}?f=json`, options);
  }
});
