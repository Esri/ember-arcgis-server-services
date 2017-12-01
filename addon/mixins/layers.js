import Ember from 'ember';
import { parseServiceUrl } from '../utils/parse-url';
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
      const server = parseServiceUrl(url);
      layerUrl = `${server}/${options.layer}`;
    }
    return this.request(layerUrl + '?f=json', options);
  },

  /**
   * Get info about all layers
   */
  getLayersInfo (url, options) {
    const server = parseServiceUrl(url);
    const layersUrl = `${server}/layers?f=json`;
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
