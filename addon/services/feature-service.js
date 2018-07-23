import Service from '@ember/service';
import serviceMixin from '../mixins/ags-service-mixin';
import layerMixin from '../mixins/layers';

export default Service.extend(serviceMixin, layerMixin, {

  /**
   * Get a record by id
   */
  getById (url, id) {
    url = `${url}/${id}?f=json`;
    return this.request(url, {method: 'GET'});
  },

  /**
   * Get attachments for a record by id
   */
  getAttachmentsById (url, id) {
    url = `${url}/${id}/attachments?f=json`;
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
   * Update an attachment,
   * data.attachment FILE
   * data.attachmentId
   * data.keywords
   */
  updateAttachment (url, data, token) {
    url = url + '/updateAttachment?f=json';
    return this.attachmentsRequest(url, data, token);
  },

  /**
   * Add a single feature
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
   * Add an attachment
   * data.attachment FILE
   * data.keywords
   */
  addAttachment (url, data, token) {
    url = url + '/addAttachment?f=json';
    return this.attachmentsRequest(url, data, token);
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
   * Delete attachments
   * data.attachmentIds ARRAY
   * data.keywords
   */
  deleteAttachments (url, data, token) {
    url = url + '/deleteAttachments?f=json';
    return this.attachmentsRequest(url, data, token);
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
  },

  attachmentsRequest (url, data, token) {
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
