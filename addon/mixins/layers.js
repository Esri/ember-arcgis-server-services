import Ember from 'ember';
import { parseServerUrl } from '../utils/parse-url';
import encodeForm from '../utils/encode-form';

export default Ember.Mixin.create({
  init: function () {
    this._super(); // ensure a good citizen in the super chain
  },

  /**
   * Get the layer info
   */
  getLayerInfo (url, options = null) {
    let layerUrl = url;
    if (options && options.layer) {
      const server = parseServerUrl(url);
      layerUrl = `${server}/${options.layer}`;
    }
    return this.request(layerUrl + '?f=json', options);
  },

  /**
   * Get info about all layers
   */
  getLayersInfo (url, options) {
    const server = parseServerUrl(url);
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
