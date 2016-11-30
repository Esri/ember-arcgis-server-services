import Ember from 'ember';
import ENV from '../../config/environment';
export default Ember.Route.extend({
  featureService: Ember.inject.service('feature-service'),
  model (params) {
    let url = ENV.APP.domainServiceUrl;
    let options = {
      includeGeometry: false,
      outFields: '*'
    };
    if (params.id) {
      options.where = encodeURI('OBJECTID=' + params.id);
    }
    return this.get('featureService').query(url, options)
    .then((results) => {
      return results.features[0];
    });
  }
});
