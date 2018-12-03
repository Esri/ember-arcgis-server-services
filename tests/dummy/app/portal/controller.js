import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
export default Controller.extend({
  session: service(),
  featureService: service('feature-service'),
  serviceUrl: 'https://pnp00035.esri.com/server/rest/services/Hosted/perimeters_dd83/FeatureServer',
  token: '',
  actions: {
    setToken (token) {
      this.set('session.token', token);
    },
    getLayerInfo () {
      const token = this.get('token');
      const sessionData = {
        token,
        portal :{
          portalHostname: 'pnp00035.esri.com/portal',
          authorizedCrossOriginDomains: []
        }
      };

      let sm = this.get('session').get('stateMachine');
      run(() => {
        sm.send('startOpen');
        sm.send('finishOpen', sessionData);

        const serviceUrl = this.get('serviceUrl');
        return this.get('featureService').getLayerInfo(serviceUrl)
        .then((layerInfo) => {
          this.set('json', JSON.stringify(layerInfo, null, 2));
        })
        .catch((err) => {
          this.set('json', JSON.stringify(err, null, 2));
        })

      });


    }
  }
});
