// import parseUrl from 'ember-arcgis-server-services/utils/parse-url';
import { tryParseServiceUrl, tryParseServerUrl, parseServiceUrl, parseServerUrl } from 'ember-arcgis-server-services/utils/parse-url';
import { module, test } from 'qunit';

module('Unit | Utility | parse-url');

test('tryParseServerUrl', function (assert) {
  assert.equal(tryParseServerUrl('not-a-url'), null, 'Should return null if not a url');
  assert.equal(tryParseServerUrl('https://koop.dc.esri.com/socrata/16/sjzx-yjzi/FeatureServer/0'), null, 'Should return null if /rest is not found');
  assert.equal(tryParseServerUrl('https://foo.bar.com/something/arcgis/rest/services/folder/featureServer/12'), 'https://foo.bar.com/something/arcgis/rest');
  assert.equal(tryParseServerUrl('https://foo.bar.com/arcgis/rest/services/folder/featureServer/12'), 'https://foo.bar.com/arcgis/rest');
  assert.equal(tryParseServerUrl('https://foo.bar.com/someintance/rest/services/folder/featureServer/12'), 'https://foo.bar.com/someintance/rest');
});

test('tryParseServiceUrl', function (assert) {
  assert.equal(tryParseServiceUrl('not-a-url'), null, 'Should return null if not a url');
  assert.equal(tryParseServiceUrl('https://koop.dc.esri.com/socrata/16/sjzx-yjzi/FeatureServer/0'), 'https://koop.dc.esri.com/socrata/16/sjzx-yjzi/FeatureServer');
  assert.equal(tryParseServiceUrl('https://foo.bar.com/something/arcgis/rest/services/folder/featureServer/12'), 'https://foo.bar.com/something/arcgis/rest/services/folder/featureServer');
  assert.equal(tryParseServiceUrl('https://foo.bar.com/arcgis/rest/services/folder/featureServer/12'), 'https://foo.bar.com/arcgis/rest/services/folder/featureServer');
  assert.equal(tryParseServiceUrl('https://foo.bar.com/someintance/rest/services/folder/featureServer/12'), 'https://foo.bar.com/someintance/rest/services/folder/featureServer');
});

test('parseServiceUrl', function (assert) {
  assert.equal(parseServiceUrl('https://foo.bar.com/someintance/rest/services/folder/featureServer/12'), 'https://foo.bar.com/someintance/rest/services/folder/featureServer');
});

test('parseServerUrl', function (assert) {
  assert.equal(parseServerUrl('https://foo.bar.com/someintance/rest/services/folder/featureServer/12'), 'https://foo.bar.com/someintance/rest');
});
