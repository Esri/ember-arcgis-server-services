import Ember from 'ember';
import fetch from 'ember-network/fetch';
import addToken from './add-token';
import encodeForm from './encode-form';

/**
 * Fetch based request method
 */
export default function request (url, opts = {}) {
  if (opts.method && opts.method === 'POST') {
    // if we are POSTing, we need to manually set the content-type because AGO
    // actually does care about this header
    if (!opts.headers) {
      opts.headers = {
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded'
      };
    }
    // if a body was passed, we need to set the content type to multipart
    if (opts.body) {
      delete opts.headers['Content-Type']; // = 'multipart/form-data';
    }

    // if we have a data, create a formData from it
    if (opts.data) {
      var form = encodeForm(opts.data);
      opts.body = form;
    }
  }
  opts.redirect = 'follow';
  opts.mode = 'cors';
  url = addToken(url, opts.token);

  return fetch(url, opts).then(checkStatusAndParseJson);
  // TODO: try JSONP if GET request fails (to support older IE versions)
  // .catch((err) => {
  //   if (err.message === 'Network request failed' && opts.method === 'GET') {
  //     // need to install ember-ajax or fetch-jsonp to try a JSONP request
  //   }
  // });
}

/**
 * Fetch does not reject on non-200 responses, so we need to check this manually
 */
function checkStatusAndParseJson (response) {
  var error;
  // Ember.debug('Fetch request status: ' + response.status);
  if (response.status >= 200 && response.status < 300) {
    // check if this is one of those groovy 200-but-a-400 things
    return response.json().then(json => {
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
}
