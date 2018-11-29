import Mixin from '@ember/object/mixin';
import { parseServiceUrl } from '../utils/parse-url';
import { request } from '@esri/arcgis-rest-request';
import { queryFeatures, getLayer, getFeature } from '@esri/arcgis-rest-feature-service';
// to do: ember fetch?

export default Mixin.create({
  init: function () {
    this._super(); // ensure a good citizen in the super chain
  },

  /**
   * Get the layer info
   */
  getLayerInfo (url, options = {}) {
    let layerUrl = url;
    if (options && options.layer) {
      const serviceUrl = parseServiceUrl(url);
      layerUrl = `${serviceUrl}/${options.layer}`;
    }

    // previously we passed along options too. could something else have been in there?
    return getLayer(layerUrl, {
      authentication: this.get('session.authMgr')
    });
  },

  /**
   * Get info about all layers
   */
  getLayersInfo (url) {
    const serviceUrl = parseServiceUrl(url);
    let layersUrl = `${serviceUrl}/layers`;
    // make the request
    return request(layersUrl, {
      authentication: this.get('session.authMgr')
    })
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
    // no support for spread operators here :(
    const queryOptions = Object.assign({
      url,
      httpMethod: "GET",
      authentication: this.get('session.authMgr')
    }, options);
    return queryFeatures(queryOptions);
  },

  /**
   * Get a record by id
   */
  getById (url, id) {
    return getFeature({
      url,
      id,
      httpMethod: "GET",
      authentication: this.get('session.authMgr')
    });
  }
});
