import Ember from 'ember';
import serviceMixin from '../mixins/ags-service-mixin';
import layerMixin from '../mixins/layers';

export default Ember.Service.extend(serviceMixin, layerMixin, {

  /**
   * Get a record by id
   */
  getById (url, id) {
    url = `${url}/${id}?f=json`;
    return this.request(url, {method: 'GET'});
  },

  /**
   * Update a single feature
   */
  updateFeature (url, feature, token) {
    return this.updateFeatures(url, [feature], token);
  },

  /**
   * Update a set of features
   */
  updateFeatures (url, features, token) {
    return this.applyEdits(url, [], features, [], token);
  },

  /**
   * Add an single feature
   */
  addFeature (url, feature, token) {
    // wrap into an array...
    let adds = [feature];
    // delegate to addFeatures
    return this.addFeatures(url, adds, token);
  },

  /**
   * Add a set of features
   */
  addFeatures (url, features, token) {
    return this.applyEdits(url, features, [], [], token);
  },

  /**
   * Delete a single feature
   */
  deleteFeature (url, objectId, token) {
    return this.deleteFeatures(url, [objectId], token);
  },

  /**
   * Delete a set of features
   */
  deleteFeatures (url, objectIds, token) {
    return this.applyEdits(url, [], [], objectIds, token);
  },

  /**
   * Actually send the edits to the Service
   */
  applyEdits (url, adds, updates, deletes, token) {
    url = url + '/applyEdits';
    let options = {
      method: 'POST',
      data: {
        adds: JSON.stringify(adds),
        updates: JSON.stringify(updates),
        deletes: deletes.join(','),
        f: 'json'
      }
    };
    if (token) {
      options.data.token = token;
    }
    return this.request(url, options);
  }
});
