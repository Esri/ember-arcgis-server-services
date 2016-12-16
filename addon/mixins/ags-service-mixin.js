import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Mixin.create({
  // session: Ember.inject.service('session'),

  hostAppConfig: Ember.computed(function () {
    return Ember.getOwner(this).resolveRegistration('config:environment');
  }),

  /**
   * Parse up the url so we have a better idea what we are dealing with
   */
  parseUrl (url) {
    var parsed = {
      url: url,
      layerId: null
    };
    // if there is a trailing slash, remove it
    url = url.replace(new RegExp('/$'), '');

    // get the last segment of the url
    let layerId = Number(url.split('/').pop());
    if (!isNaN(layerId)) {
      parsed.layerId = layerId;
      parsed.serviceUrl = url.replace(new RegExp('/' + parsed.layerId + '$'), '');
      // incase there were double slashes, nix any trailing slash
      parsed.serviceUrl = parsed.serviceUrl.replace(new RegExp('/$'), '');
    } else {
      parsed.serviceUrl = url.replace(new RegExp('/$'), '');
      // this url points at a service, not a layer
    }
    // get the type from the last part of the serviceUrl
    // parsed.serviceType = Ember.String.dasherize(parsed.serviceUrl.split('/').pop());
    // this is not reliable - MapServer can have extensions i.e. /WMSServer
    // so we should check for well-known server types
    parsed.serviceType = 'unknown';
    let wktypes = ['MapServer', 'FeatureServer', 'ImageServer', 'WMSServer'];
    wktypes.forEach((type) => {
      if (url.toLowerCase().indexOf(type.toLowerCase()) > -1) {
        parsed.serviceType = Ember.String.dasherize(type);
      }
    });
    Ember.debug('Service Type: ' + parsed.serviceType);

    // if it's hosted, pull out the orgid
    if (url.indexOf('arcgis.com') > -1) {
      // extract out the org_id
      parsed.isHosted = true;
      parsed.orgId = url.split('/')[3];
    }

    // finally, if this is tiles, the org id is in another position
    if (url.indexOf('arcgis.com/tiles') > -1) {
      // extract out the org_id
      parsed.orgId = url.split('/')[4];
    }
    return parsed;
  },

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
