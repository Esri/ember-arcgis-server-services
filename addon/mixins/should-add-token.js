import Ember from 'ember';
import {shouldAddToken, hostsMatch} from 'ember-arcgis-server-services/utils/should-add-token';

export default Ember.Mixin.create({
  shouldAddToken,
  hostsMatch
});
