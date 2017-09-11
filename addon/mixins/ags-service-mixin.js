import Ember from 'ember';
import agoRequest from '../utils/request';
import { parseServerUrl, parseType } from '../utils/parse-url';
import shouldAddToken from '../utils/should-add-token';

export default Ember.Mixin.create({
  init: function () {
    this._super(); // ensure a good citizen in the super chain
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
    if (shouldAddToken(url, this.get('session.portal.id'), this.get('session.portal.portalHostname'))) {
      options.token = this.get('session.token');
    }
    // options.token = this.get('session.token');
    options.method = options.method || 'GET';
    return agoRequest(url, options);
  },

  /**
   * Get the service info
   * TODO what's using this? can it be removed?
   */
  getServiceInfo (url, options) {
    return this.request(url + '?f=json', options);
  },

  /**
  * Get the base server info
   */
  getServerInfo (url, options) {
    const server = parseServerUrl(url);
    return this.request(`${server}?f=json`, options);
  }
});
