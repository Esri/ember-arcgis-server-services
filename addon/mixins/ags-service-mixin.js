import Ember from 'ember';
import agoRequest from '../utils/request';
import parseUrl from '../utils/parse-url';

export default Ember.Mixin.create({
  init: function () {
    this._super(); // ensure a good citizen in the super chain
  },

  session: Ember.inject.service('session'),

  hostAppConfig: Ember.computed(function () {
    return Ember.getOwner(this).resolveRegistration('config:environment');
  }),

  // export it here so as not to break the API
  parseUrl,

  request (url, options = {}) {
    options.token = this.get('session.token');
    options.method = options.method || 'GET';
    return agoRequest(url, options);
  },

  /**
   * Get the service info
   */
  getServiceInfo (url) {
    return this.request(url + '?f=json');
  },
});
