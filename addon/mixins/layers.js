import Ember from 'ember';
import { parseServerUrl } from '../utils/parse-url';

export default Ember.Mixin.create({
  init: function () {
    this._super(); // ensure a good citizen in the super chain
  },

  getServerInfo (url) {
    const server = parseServerUrl(url);
    return this.request(`${server}?f=json`);
  },
  /**
   * Get the layer info
   */
  getLayerInfo (url, options) {
    let layerUrl = url;
    if (options.layer) {
      const server = parseServerUrl(url);
      layerUrl = `${server}/${options.layer}`;
    }
    return this.request(layerUrl + '?f=json');
  },

  getLayersInfo (url) {
    const server = parseServerUrl(url);
    const layersUrl = `${server}/layers?f=json`;
    return this.request(layersUrl)
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
    let encoded = this.encodeForm(options);
    url = url + '/query?f=json&' + encoded;
    return this.request(url, {method: 'GET'});
  },

  /**
   * Get a record by id
   */
  getById (url, id) {
    url = `${url}/${id}?f=json`;
    return this.request(url, {method: 'GET'});
  },
});
