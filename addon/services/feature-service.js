import Service from '@ember/service';
import serviceMixin from '../mixins/ags-service-mixin';
import layerMixin from '../mixins/layers';
import { debug } from '@ember/debug';
import {
  addFeatures,
  updateFeatures,
  deleteFeatures,
  getAttachments
} from "@esri/arcgis-rest-feature-service";

export default Service.extend(serviceMixin, layerMixin, {

  /**
   * Get a record by id
   */
  // getById (url, id) {
  // ***> implemented in layerMixin
  // },


  /**
   * Get attachments for a record by id
   */
  getAttachmentsById (url, id) {
    const options = {
      url,
      featureId: id,
      httpMethod: 'GET'
    }
    return getAttachments(options)
    .catch((err) => {
      if (err.name === 'ArcGISAuthError') {
        options.authentication = this.get('session.authMgr');
        return getAttachments(options);
      }
    })
  },

  /**
   * Update a single feature
   */
  updateFeature (url, feature) {
    return updateFeatures({
      url,
      features: [feature],
      authentication: this.get('session.authMgr')
    });
  },

  /**
   * Update a set of features
   */
  updateFeatures (url, features) {
    return updateFeatures({
      url,
      features,
      authentication: this.get('session.authMgr')
    });
  },

  /**
   * Update an attachment,
   * data.attachment FILE
   * data.attachmentId
   * data.keywords
   */
  updateAttachment (url, data, token) {
    debug(`WARNING: feature-service.updateAttachment does not use ArcGIS Rest JS.`);
    // the feature id must already be embedded in the url
    url = url + '/updateAttachment?f=json';
    return this.attachmentsRequest(url, data, token);
  },

  /**
   * Add a single feature
   */
  addFeature (url, feature) {
    // delegate to addFeatures
    return addFeatures({
      url,
      features: [feature],
      authentication: this.get('session.authMgr')
    });
  },

  /**
   * Add a set of features
   */
  addFeatures (url, features) {
    return addFeatures({
      url,
      features,
      authentication: this.get('session.authMgr')
    });
  },

  /**
   * Add an attachment
   * data.attachment FILE
   * data.keywords
   */
  addAttachment (url, data, token) {
    debug(`WARNING: feature-service.addAttachment does not use ArcGIS Rest JS.`);
    url = url + '/addAttachment?f=json';
    return this.attachmentsRequest(url, data, token);
  },

  /**
   * Delete a single feature
   */
  deleteFeature (url, objectId) {
    return deleteFeatures({
      url,
      objectIds: [objectId],
      authentication: this.get('session.authMgr')
    });
  },

  /**
   * Delete a set of features
   */
  deleteFeatures (url, objectIds) {
    return deleteFeatures({
      url,
      objectIds,
      authentication: this.get('session.authMgr')
    });
  },

  /**
   * Delete attachments
   * data.attachmentIds ARRAY
   * data.keywords
   */
  deleteAttachments (url, data, token) {
    debug(`WARNING: feature-service.deleteAttachments does not use ArcGIS Rest JS.`);
    url = url + '/deleteAttachments?f=json';
    return this.attachmentsRequest(url, data, token);
  },

  /**
   * Actually send the edits to the Service
   */
  applyEdits (url, adds, updates, deletes, token) {
    // no equivalent method exists in rest-js (yet)
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
  },

  attachmentsRequest (url, data, token) {
    debug(`WARNING: feature-service.attachmentsRequest does not use ArcGIS Rest JS.`);
    let options = {
      method: 'POST',
      mimeType: 'multipart/form-data',
      body: new FormData()
    }
    Object.keys(data).forEach(key => {
      options.body.append(key, data[key]);
    });
    if (token) {
      options.token = token;
    }
    return this.request(url, options);
  }
});
