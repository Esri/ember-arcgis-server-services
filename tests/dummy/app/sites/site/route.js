import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ENV from '../../config/environment';
export default Route.extend({
  featureService: service('feature-service'),
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
