import Ember from 'ember';
import ENV from '../../config/environment';
export default Ember.Route.extend({
  featureService: Ember.inject.service('feature-service'),

  queryParams: {
    'q': {refreshModel: true}
  },

  model (params) {
    let url = ENV.APP.domainServiceUrl; // 'https://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/sitedomains/FeatureServer/0';
    let options = {
      includeGeometry: false,
      outFields: '*'
    };
    // use the params to issue a search against this layer
    if (params.q && params.q !== '*') {
      options.where = encodeURI("domain='" + params.q + "'");
    } else {
      options.where = encodeURI('1=1');
    }

    return this.get('featureService').query(url, options);
  }
});
