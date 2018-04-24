import { debug } from '@ember/debug';
import { reads } from '@ember/object/computed';
import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ENV from '../../config/environment';
export default Controller.extend({
  session: service(),
  featureService: service('feature-service'),
  queryParams: ['q'],
  start: 1,
  q: null,
  query: '*',
  num: 10,
  owner: null,
  tags: null,
  typeKeywords: null,
  type: null,

  totalCount: computed('model.features', function () {
    return this.get('model.features.length');
  }),

  queryChanged: observer('q', function () {
    this.set('query', this.get('q'));
  }),

  portalItemUrl: computed('session.portal', function () {
    let cbu = this.get('session.portal.customBaseUrl');
    let urlKey = this.get('session.portal.urlKey');
    return `https://${urlKey}.${cbu}/home/item.html?id=`;
  }),

  currentUser: reads('session.currentUser.username'),

  actions: {
    filter () {
      this.set('q', this.get('query'));
      // reset the page
      this.set('start', 1);
      this.transitionToRoute('sites.index');
    },
    delete (objectId) {
      debug('Deleting Id: ' + objectId);
      let token = this.get('session.token');
      let url = ENV.APP.domainServiceUrl; // 'https://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/sitedomains/FeatureServer/0';
      this.get('featureService').deleteFeature(url, objectId, token)
      .then((/*result*/) => {
        // instead of refreshing the model for the list, just remove the entry
        let remaining = this.get('model.features').filter((item) => {
          return item.attributes.OBJECTID !== objectId;
        });
        this.set('model.features', remaining);
      });
    }

  }
});
