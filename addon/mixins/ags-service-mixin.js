import { deprecate } from '@ember/application/deprecations';
import { debug } from '@ember/debug';
import { resolve } from 'rsvp';
import { isBlank } from '@ember/utils';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';
import agoRequest from '../utils/request';
import {
  parseServiceUrl,
  parseServerUrl,
  parseType
} from '../utils/parse-url';
import shouldAddTokenUtil from '../utils/should-add-token';

export default Mixin.create({
  init: function () {
    this._super(); // ensure a good citizen in the super chain
    this.set('shouldAddTokenCache', {});
  },

  session: service(),

  hostAppConfig: computed(function () {
    return getOwner(this).resolveRegistration('config:environment');
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
  shouldAddToken (url, portalInfo) {
    if (!portalInfo) {
      // if they are not logged in, we definitely do not want to add a token because we don't have ont
      // so we can save the xhr below
      // and we do not want to cache this value because the user might log in
      return resolve(false);
    }

    const shouldAddTokenCache = this.get('shouldAddTokenCache');
    const key = parseServerUrl(url) || url;
    const cachedValue = shouldAddTokenCache[key];

    if (!isBlank(cachedValue)) {
      return resolve(cachedValue);
    }

    return this.getAuthInfo(url)
      .then(authInfo => {
        const result = shouldAddTokenUtil(url, authInfo, portalInfo);
        shouldAddTokenCache[key] = result;
        return result;
      })
      .catch((err) => {
        debug(`Error occured checking authInfo for ${url}. Message: ${err}. Will not send token for ${key}`);
        shouldAddTokenCache[key] = false;
        return false;
      });
  },

  getServiceInfo (url, options) {
    deprecate('use .getLayerInfo(url, options).', false, {id: 'getServiceInfoDeprecation', until: '10.0.0'});
    return this.getLayerInfo(url, options);
  },

  // This method was also declared in the ags-service-mixin and was shadowing that implementation
  // So it's removed now...
  // getLayerInfo (url, options) {
  //   return this.request(url + '?f=json', options);
  // },

  /**
  * Get the base server info.
  * Returns stuff like version, services and folders
   */
  getServerInfo (url, options) {
    const serviceUrl = parseServiceUrl(url);
    let service = url;
    if (serviceUrl) {
      service = serviceUrl;
    }
    return this.request(`${service}?f=json`, options);
  },

  /**
   * Get the authentication information from a server.
   */
  getAuthInfo (url, options) {
    let server = url;
    const serverUrl = parseServerUrl(url);
    if (serverUrl) {
      server = serverUrl;
    }
    // we want to never send a token for this one so we use agoRequest directly
    return agoRequest(`${server}/info?f=json`, options);
  }

});
