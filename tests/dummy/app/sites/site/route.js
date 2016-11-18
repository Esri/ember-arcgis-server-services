import Ember from 'ember';

export default Ember.Route.extend({
  featureService: Ember.inject.service('feature-service'),
  model (params) {
    let url = 'https://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/sitedomains/FeatureServer/0';
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
