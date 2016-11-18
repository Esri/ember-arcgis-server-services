import Ember from 'ember';
import serviceMixin from '../mixins/ags-service-mixin';

export default Ember.Service.extend(serviceMixin, {

  /**
   * Get the layer info
   */
  getLayerInfo (url) {
    return this.request(url + '?f=json', {method: 'GET'});
  }

});
