import Ember from 'ember';
import ShouldAddTokenMixin from 'ember-arcgis-server-services/mixins/should-add-token';
import { module, test } from 'qunit';

module('Unit | Mixin | should add token');
let ShouldAddTokenObject = Ember.Object.extend(ShouldAddTokenMixin);
let subject = ShouldAddTokenObject.create();

test('should have a shouldAddToken method', function (assert) {
  assert.ok(subject.shouldAddToken, 'shouldAddToken mixin should expose a shouldAddToken method');
});
