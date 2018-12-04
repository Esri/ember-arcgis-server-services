import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
  session: service(),
  featureService: service('feature-service'),
  serviceUrl: 'https://PNP00035.esri.com/server/rest/services/Hosted/perimeters_dd83/FeatureServer',

  actions: {
    getLayerInfo () {
      const serviceUrl = this.get('serviceUrl');
      const options = {
        authentication: this.get('session.authMgr')
      };
      return this.get('featureService').getLayerInfo(serviceUrl, options)
      .then((layerInfo) => {
        this.set('json', JSON.stringify(layerInfo, null, 2));
      })
      .catch((err) => {
        this.set('json', JSON.stringify(err, null, 2));
      })
    }
  }
});
