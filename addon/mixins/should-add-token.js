import Ember from 'ember';
import {shouldAddToken, hostsMatch} from 'ember-arcgis-server-services/utils/should-add-token';

// This thing only exists so that we can test utlities
// I'd get rid of the utlity and just use this, but that would be a breaking change
export default Ember.Mixin.create({
  shouldAddToken,
  hostsMatch
});
