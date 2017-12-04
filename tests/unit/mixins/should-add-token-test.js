import Ember from 'ember';
import ShouldAddTokenMixin from 'ember-arcgis-server-services/mixins/should-add-token';
import { module, test } from 'qunit';

module('Unit | Mixin | should add token');
let ShouldAddTokenObject = Ember.Object.extend(ShouldAddTokenMixin);
let subject = ShouldAddTokenObject.create();

test('works with same level of names', function (assert) {
  assert.notOk(subject.hostsMatch('https://server.arcgis.com/FeatureServer/0', 'http://portal.arcgis.com'));
  assert.ok(subject.hostsMatch('https://server.arcgis.com/FeatureServer/0', 'http://server.arcgis.com'));
});

test('works with a longer server name', function (assert) {
  assert.notOk(subject.hostsMatch('https://server.foo.arcgis.com/FeatureServer/0', 'http://portal.arcgis.com'));
  assert.ok(subject.hostsMatch('https://server.foo.arcgis.com/FeatureServer/0', 'http://server.foo.arcgis.com'));
});

test('works with a longer portal name', function (assert) {
  assert.notOk(subject.hostsMatch('https://server.foo.arcgis.com/FeatureServer/0', 'http://server.foo.bar.portal.arcgis.com'));
  assert.ok(subject.hostsMatch('https://server.foo.arcgis.com/FeatureServer/0', 'http://server.foo.arcgis.com'));
});

test('works with ports thrown in for fun', function (assert) {
  assert.notOk(subject.hostsMatch('https://server.foo.arcgis.com:6443/FeatureServer/0', 'http://server.foo.bar.portal.arcgis.com'));
  assert.ok(subject.hostsMatch('https://server.foo.arcgis.com:6443/FeatureServer/0', 'http://server.foo.arcgis.com'));
});

test('works with ports thrown in for fun on both', function (assert) {
  assert.notOk(subject.hostsMatch('https://server.foo.arcgis.com:6443/FeatureServer/0', 'http://server.foo.bar.portal.arcgis.com:7443/portal'));
  assert.ok(subject.hostsMatch('https://server.foo.arcgis.com:6443/FeatureServer/0', 'http://server.foo.arcgis.com:7443/portal'));
});

test('does not work with different hostnames', function (assert) {
  assert.notOk(subject.hostsMatch('https://server.foo.bar.com:6443/FeatureServer/0', 'http://server.foo.bar.portal.arcgis.com:7443/portal'));
  assert.ok(subject.hostsMatch('https://server.foo.bar.com:6443/FeatureServer/0', 'http://server.foo.bar.com:7443/portal'));
});

test('does throw an exception with bad input', function (assert) {
  assert.notOk(subject.hostsMatch());
  assert.notOk(subject.hostsMatch(''));
  assert.notOk(subject.hostsMatch('https://server.foo.bar.com:6443/FeatureServer/0'));
  assert.notOk(subject.hostsMatch({}));

  assert.notOk(subject.hostsMatch(undefined, ''));
  assert.notOk(subject.hostsMatch(undefined, 'https://server.foo.bar.com:6443/FeatureServer/0'));
  assert.notOk(subject.hostsMatch(undefined, {}));
});

test('shouldAddToken returns false when token should not be added', function (assert) {
  const url = 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer/0/query?returnCountOnly=true&f=json&where=1%3D1&inSR=4326&geometry=-118.132,34.16,-118.122,34.162&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects';
  const serverInfo = {
    owningSystemUrl: 'http://www.arcgis.com'
  };
  const portalInfo = {
    portalHostname: 'qaext.arcgis.com',
    authorizedCrossOriginDomains: []
  };
  assert.notOk(subject.shouldAddToken(url, serverInfo, portalInfo));
});

test('shouldAddToken returns true when hostnames match', function (assert) {
  const url = 'https://servicesqa.arcgis.com/97KLIFOSt5CxbiRI/ArcGIS/rest/services/integration_features_10001/FeatureServer/0/query?returnCountOnly=true&f=json&where=1%3D1&inSR=4326&geometry=-95.107,41.389,-95.025,41.4&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects';
  const serverInfo = {
    owningSystemUrl: 'http://qaext.arcgis.com'
  };
  const portalInfo = {
    portalHostname: 'qaext.arcgis.com',
    authorizedCrossOriginDomains: []
  };
  assert.ok(subject.shouldAddToken(url, serverInfo, portalInfo));
});

test('shouldAddToken returns true when domain is authorized', function (assert) {
  const url = 'https://servicesqa.arcgis.com/97KLIFOSt5CxbiRI/ArcGIS/rest/services/integration_features_10001/FeatureServer/0/query?returnCountOnly=true&f=json&where=1%3D1&inSR=4326&geometry=-95.107,41.389,-95.025,41.4&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects';
  const serverInfo = {
    owningSystemUrl: 'http://qaext.arcgis.com'
  };
  const portalInfo = {
    portalHostname: 'www.arcgis.com',
    authorizedCrossOriginDomains: [ 'servicesqa.arcgis.com' ]
  };
  assert.ok(subject.shouldAddToken(url, serverInfo, portalInfo));
});
