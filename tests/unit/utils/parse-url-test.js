// import parseUrl from 'ember-arcgis-server-services/utils/parse-url';
import { parseServiceUrl, parseServerUrl } from 'ember-arcgis-server-services/utils/parse-url';
import { module, test } from 'qunit';

module('Unit | Utility | parse-url', function() {
  test('parseServerUrl', function (assert) {
    assert.equal(parseServerUrl('not-a-url'), 'not-a-url', 'Should return whats passed if no match');
    assert.equal(parseServerUrl('https://koop.dc.esri.com/something?foo=wat'), 'https://koop.dc.esri.com/something', 'Should strip querystrings if /rest not found');
    assert.equal(parseServerUrl('https://koop.dc.esri.com/socrata/16/sjzx-yjzi/FeatureServer/0'), 'https://koop.dc.esri.com/socrata/16/sjzx-yjzi/FeatureServer/0', 'Should return url if /rest is not found');
    assert.equal(parseServerUrl('https://foo.bar.com/something/arcgis/rest/services/folder/featureServer/12'), 'https://foo.bar.com/something/arcgis/rest');
    assert.equal(parseServerUrl('https://foo.bar.com/arcgis/rest/services/folder/featureServer/12'), 'https://foo.bar.com/arcgis/rest');
    assert.equal(parseServerUrl('https://foo.bar.com/someintance/rest/services/folder/featureServer/12'), 'https://foo.bar.com/someintance/rest');
  });

  test('parseServiceUrl', function (assert) {
    assert.equal(parseServiceUrl('not-a-url'), 'not-a-url', 'Should return whats passed if no match');
    assert.equal(parseServiceUrl('https://koop.dc.esri.com/socrata/16/sjzx-yjzi/FeatureServer/0?f=json'), 'https://koop.dc.esri.com/socrata/16/sjzx-yjzi/FeatureServer');
    assert.equal(parseServiceUrl('https://koop.dc.esri.com/socrata/16/sjzx-yjzi/FeatureServer/0'), 'https://koop.dc.esri.com/socrata/16/sjzx-yjzi/FeatureServer');
    assert.equal(parseServiceUrl('https://foo.bar.com/something/arcgis/rest/services/folder/featureServer/12'), 'https://foo.bar.com/something/arcgis/rest/services/folder/featureServer');
    assert.equal(parseServiceUrl('https://foo.bar.com/arcgis/rest/services/folder/featureServer/12'), 'https://foo.bar.com/arcgis/rest/services/folder/featureServer');
    assert.equal(parseServiceUrl('https://foo.bar.com/someintance/rest/services/folder/featureServer/12'), 'https://foo.bar.com/someintance/rest/services/folder/featureServer');
  });
});
