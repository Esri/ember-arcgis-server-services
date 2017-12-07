import Ember from 'ember';
import { tryParseServiceUrl } from '../utils/parse-url';
import encodeForm from '../utils/encode-form';

export default Ember.Mixin.create({
  init: function () {
    this._super(); // ensure a good citizen in the super chain
  },

  /**
   * Get the layer info
   */
  getLayerInfo (url, options = {}) {
    let layerUrl = url;
    if (options && options.layer) {
      const serviceUrl = tryParseServiceUrl(url);
      if (serviceUrl) {
        layerUrl = `${serviceUrl}/${options.layer}`;
      } else {
        Ember.debugger(`getLayerInfo could not extract the serviceUrl from ${url}. Using the url as passed and not appending layer ${options.layer}.`);
      }
    }
    return this.request(layerUrl + '?f=json', options);
  },

  /**
   * Get info about all layers
   */
  getLayersInfo (url, options) {
    let layersUrl = url;
    const serviceUrl = tryParseServiceUrl(url);
    if (serviceUrl) {
      layersUrl = `${serviceUrl}/layers?f=json`;
    } else {
      Ember.debugger(`getLayersInfo could not extract the serviceUrl from ${url}. Using the url as passed in.`);
    }
    // make the request
    return this.request(layersUrl, options)
      .then(layerInfo => {
        const merged = [...layerInfo.layers, ...layerInfo.tables];
        this.set('layers', merged);
        return merged;
      })
      .catch(e => Promise.reject(e));
  },

  /**
   * Search for records
   */
  query (url, options) {
    let encoded = encodeForm(options);
    url = url + '/query?f=json&' + encoded;
    return this.request(url, { method: 'GET' });
  },

  /**
   * Get a record by id
   */
  getById (url, id, options) {
    url = `${url}/${id}?f=json`;
    return this.request(url, options);
  }
});
