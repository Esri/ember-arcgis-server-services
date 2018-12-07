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
    return getLayer(layerUrl)
    .catch(err => {
      if (err.name === 'ArcGISAuthError') {
        return getLayer(layerUrl, {authentication: this.get('session.authMgr')})
      }
    })
  },

  /**
   * Get info about all layers
   */
  getLayersInfo (url) {
    const serviceUrl = parseServiceUrl(url);
    let layersUrl = `${serviceUrl}/layers`;
    const after = (response) => {
      const merged = [...response.layers, ...response.tables];
      this.set('layers', merged);
      return merged;
    };
    // make the request
    return request(layersUrl)
    .then(after)
    .catch(err => {
      if (err.name === 'ArcGISAuthError') {
        return request(layersUrl, {authentication: this.get('session.authMgr')})
        .then(after);
      }
    })
  },

  /**
   * Search for records
   */
  query (url, options) {
    // no support for spread operators here :(
    const queryOptions = Object.assign({
      url,
      httpMethod: "GET"
    }, options);
    return queryFeatures(queryOptions)
    .catch(err => {
      if (err.name === 'ArcGISAuthError') {
        queryOptions.authentication = this.get('session.authMgr');
        return queryFeatures(queryOptions)
      }
    })
  },

  /**
   * Get a record by id
   */
  getById (url, id) {
    const options ={
      url,
      id,
      httpMethod: "GET",
    };
    return getFeature(options)
    .catch(err => {
      if (err.name === 'ArcGISAuthError') {
        options.authentication = this.get('session.authMgr');
        return getFeature(options);
      }
    })
  }
});
