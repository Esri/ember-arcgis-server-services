import Ember from 'ember';
import ShouldAddTokenMixin from 'ember-arcgis-server-services/mixins/should-add-token';
import { module, test } from 'qunit';

module('Unit | Mixin | should add token');
let ShouldAddTokenObject = Ember.Object.extend(ShouldAddTokenMixin);
let subject = ShouldAddTokenObject.create();

// Replace this with your real tests.
test('works with same level of names', function (assert) {
  assert.ok(subject.hostsMatch('https://server.arcgis.com/FeatureServer/0', 'http://portal.arcgis.com'));
});

test('works with equivalent names', function (assert) {
  assert.ok(subject.hostsMatch('https://portal.arcgis.com/FeatureServer/0', 'http://portal.arcgis.com'));
});

test('works with a longer server name', function (assert) {
  assert.ok(subject.hostsMatch('https://server.foo.arcgis.com/FeatureServer/0', 'http://portal.arcgis.com'));
});

test('works with a longer portal name', function (assert) {
  assert.ok(subject.hostsMatch('https://server.foo.arcgis.com/FeatureServer/0', 'http://server.foo.bar.portal.arcgis.com'));
});

test('works with ports thrown in for fun', function (assert) {
  assert.ok(subject.hostsMatch('https://server.foo.arcgis.com:6443/FeatureServer/0', 'http://server.foo.bar.portal.arcgis.com'));
});

test('works with ports thrown in for fun on both', function (assert) {
  assert.ok(subject.hostsMatch('https://server.foo.arcgis.com:6443/FeatureServer/0', 'http://server.foo.bar.portal.arcgis.com:7443/portal'));
});

test('does not work with different hostnames', function (assert) {
  assert.notOk(subject.hostsMatch('https://server.foo.bar.com:6443/FeatureServer/0', 'http://server.foo.bar.portal.arcgis.com:7443/portal'));
});

test('does throw an exception with bad input', function (assert) {
  assert.notOk(subject.hostsMatch());
});
