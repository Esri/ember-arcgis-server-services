import shouldAddToken from 'ember-arcgis-server-services/utils/should-add-token';
import { module, test } from 'qunit';

module('Unit | Utility | parse-url', function() {
  test('shouldAddToken returns false when server does not accept tokens', function (assert) {
    const url = 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer/0';
    const serverInfo = {
      authInfo: {
        isTokenBasedSecurity: false
      },
      owningSystemUrl: 'http://www.arcgis.com'
    };
    const portalInfo = {
      portalHostname: 'qaext.arcgis.com',
      authorizedCrossOriginDomains: []
    };
    assert.notOk(shouldAddToken(url, serverInfo, portalInfo));
  });

  test('shouldAddToken returns true when portal is owningSystemUrl', function (assert) {
    const url = `https://pheede2-win10vm.esri.com/server/rest/services/Hosted/Emergency_Calls/FeatureServer/0/query?f=json&outFields=*&outStatistics=%5B%7B%22onStatisticField%22%3A%22priority%22%2C%22outStatisticFieldName%22%3A%22priority_count%22%2C%22statisticType';%22%3A%22count%22%7D%5D&returnGeometry=false&where=1%3D1`;

    const serverInfo = {
      "currentVersion": 10.61,
      "fullVersion": "10.6.1",
      "soapUrl": "https://pheede2-win10vm.esri.com/server/services",
      "secureSoapUrl": null,
      "owningSystemUrl": "https://pheede2-win10vm.esri.com/portal",
      "authInfo": {
        "isTokenBasedSecurity": true,
        "tokenServicesUrl": "https://pheede2-win10vm.esri.com/portal/sharing/rest/generateToken"
      }
    };
    const portalInfo = {
      "portalHostname": "pheede2-win10vm.esri.com/portal",
      authorizedCrossOriginDomains: []
    };
    assert.ok(shouldAddToken(url, serverInfo, portalInfo));
  });

  test('shouldAddToken returns false when portal is not owningSystemUrl', function (assert) {
    const url = 'https://services2.arcgis.com/zNjnZafDYCAJAbN0/arcgis/rest/services/Street_ROW_Trees/FeatureServer/0/query?returnCountOnly=true&f=json&where=1%3D1&inSR=4326&geometry=-118.132,34.16,-118.122,34.162&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects';
    const serverInfo = {
      authInfo: {
        isTokenBasedSecurity: true
      },
      owningSystemUrl: 'http://www.arcgis.com'
    };
    const portalInfo = {
      portalHostname: 'qaext.arcgis.com',
      authorizedCrossOriginDomains: []
    };
    assert.notOk(shouldAddToken(url, serverInfo, portalInfo));
  });

  test('shouldAddToken returns false when dealing across qa/dev', function (assert) {
    const url = 'https://servicesqa.arcgis.com/97KLIFOSt5CxbiRI/ArcGIS/rest/services/integration_features_10001/FeatureServer/0/query?returnCountOnly=true&f=json&where=1%3D1&inSR=4326&geometry=-95.107,41.389,-95.025,41.4&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects';
    const serverInfo = {
      currentVersion: 10.51,
      fullVersion: '10.5.1.440',
      owningSystemUrl: 'http://qaext.arcgis.com',
      owningTenant: '97KLIFOSt5CxbiRI',
      authInfo: {
        isTokenBasedSecurity: true,
        tokenServicesUrl: 'https://qaext.arcgis.com/sharing/generateToken'
      }
    };
    const portalInfo = {
      portalHostname: 'devext.arcgis.com',
      authorizedCrossOriginDomains: []
    };
    assert.notOk(shouldAddToken(url, serverInfo, portalInfo));
  });

  test('shouldAddToken returns true when domain is an authorized Cross Origin domain', function (assert) {
    const url = 'https://otherthing.somebox.com/97KLIFOSt5CxbiRI/ArcGIS/rest/services/integration_features_10001/FeatureServer/0/query?returnCountOnly=true&f=json&where=1%3D1&inSR=4326&geometry=-95.107,41.389,-95.025,41.4&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects';
    const serverInfo = {
      authInfo: {
        isTokenBasedSecurity: true
      },
      owningSystemUrl: 'http://qaext.arcgis.com'
    };
    const portalInfo = {
      portalHostname: 'qaext.arcgis.com',
      authorizedCrossOriginDomains: [ 'otherthing.somebox.com' ]
    };
    assert.ok(shouldAddToken(url, serverInfo, portalInfo));
  });

  test('shouldAddToken returns false when domain is arcgisonline', function (assert) {
    const url = 'https://sampleserver3.arcgisonline.com/arcgis/rest/services/Earthquakes/RecentEarthquakesRendered/MapServer?f=json';
    // this is the actual response from server3.arcgisonline.com as of 12/7/17
    const serverInfo = {
      authInfo: {
        isTokenBasedSecurity: false
      },
      currentVersion: '10.05',
      secureSoapUrl: 'https://IP-0A6685F0:443/ArcGIS/services',
      soapUrl: 'http://IP-0A6685F0/ArcGIS/services'
    };
    const portalInfo = {
      portalHostname: 'qaext.arcgis.com',
      authorizedCrossOriginDomains: []
    };
    assert.notOk(shouldAddToken(url, serverInfo, portalInfo));
  });
});
