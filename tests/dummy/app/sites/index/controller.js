import Ember from 'ember';
import ENV from '../../config/environment';
export default Ember.Controller.extend({
  session: Ember.inject.service(),
  featureService: Ember.inject.service('feature-service'),
  queryParams: ['q'],
  start: 1,
  q: null,
  query: '*',
  num: 10,
  owner: null,
  tags: null,
  typeKeywords: null,
  type: null,

  totalCount: Ember.computed('model.features', function () {
    return this.get('model.features.length');
  }),

  queryChanged: Ember.observer('q', function () {
    this.set('query', this.get('q'));
  }),

  portalItemUrl: Ember.computed('session.portal', function () {
    let cbu = this.get('session.portal.customBaseUrl');
    let urlKey = this.get('session.portal.urlKey');
    return `https://${urlKey}.${cbu}/home/item.html?id=`;
  }),

  currentUser: Ember.computed.reads('session.currentUser.username'),

  actions: {
    filter () {
      this.set('q', this.get('query'));
      // reset the page
      this.set('start', 1);
      this.transitionToRoute('sites.index');
    },
    delete (objectId) {
      Ember.debug('Deleting Id: ' + objectId);
      let token = this.get('session.token');
      let url = ENV.APP.domainServiceUrl; // 'https://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/sitedomains/FeatureServer/0';
      this.get('featureService').deleteFeature(url, objectId, token)
      .then((result) => {
        // instead of refreshing the model for the list, just remove the entry
        let remaining = this.get('model.features').filter((item) => {
          return item.attributes.OBJECTID !== objectId;
        });
        this.set('model.features', remaining);
      });
    }

  }
});
