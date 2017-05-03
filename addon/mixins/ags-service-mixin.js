import Ember from 'ember';
import fetch from 'ember-network/fetch';
import parseUrl from '../utils/parse-url';

export default Ember.Mixin.create({
  // session: Ember.inject.service('session'),

  hostAppConfig: Ember.computed(function () {
    return Ember.getOwner(this).resolveRegistration('config:environment');
  }),

  // export it here so as not to break the API
  parseUrl,

  /**
   * Get the service info
   */
  getServiceInfo (url) {
    return this.request(url + '?f=json');
  },

  encodeForm (form = {}) {
    return Object.keys(form).map((key) => {
      return [key, form[key]].map(encodeURIComponent).join('=');
    }).join('&');
  },

  /**
   * Fetch does not reject on non-200 responses, so we need to check this manually
   */
  checkStatusAndParseJson (response) {
    var error;
    Ember.debug('Fetch request status: ' + response.status);
    if (response.status >= 200 && response.status < 300) {
      // check if this is one of those groovy 200-but-a-400 things
      return response.json().then((json) => {
        if (json.error) {
          // cook an error
          error = new Error(json.error.message);
          error.code = json.error.code || 404;
          error.response = response;
          Ember.debug('Error in response:  ' + json.error.message);
          throw error;
        } else {
          return json;
        }
      });
    } else {
      // Response has non 200 http code
      error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  },

  /**
   * Fetch based request method
   */
  request (url, options) {
    let opts = options || {};

    if (opts.method && opts.method === 'POST') {
      // if we are POSTing, we need to manually set the content-type because AGO
      // actually does care about this header
      if (!opts.headers) {
        opts.headers = {
          'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      }
      // if a body was passed, we need to set the content type to multipart
      if (opts.body) {
        delete opts.headers['Content-Type'];// = 'multipart/form-data';
      }

      // if we have a data, create a formData from it
      if (opts.data) {
        var form = this.encodeForm(opts.data);
        opts.body = form;
      }
    }
    opts.redirect = 'follow';
    opts.mode = 'cors';

    // append in the token
    // if (this.get('session') && this.get('session.token')) {
    //   let token = this.get('session.token');
    //   // add a token
    //   if (url.indexOf('?') > -1) {
    //     url = url + '&token=' + token;
    //   } else {
    //     url = url + '?token=' + token;
    //   }
    // }

    Ember.debug('Making request to ' + url);

    return fetch(url, opts)
      .then(this.checkStatusAndParseJson);
      // TODO: try JSONP if GET request fails (to support older IE versions)
      // .catch((err) => {
      //   if (err.message === 'Network request failed' && opts.method === 'GET') {
      //     // need to install ember-ajax or fetch-jsonp to try a JSONP request
      //   }
      // });
  }
});
