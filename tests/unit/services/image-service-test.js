import { resolve } from 'rsvp';
import Service from '@ember/service';
import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';

module('Unit | Service | image service', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:session', Service.extend({}));
  });

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:image-service');
    assert.ok(service);
  });

  test('getServerInfo takes url', function (assert) {
    let service = this.owner.lookup('service:image-service');
    this.stub(service, 'request').callsFake(function (/*url, options */) {
      return resolve({ prop: 'value' });
    });
    return service.getServerInfo('http://landscape4qa.arcgis.com/arcgis/rest/services/USA_Soils_Hydric_Classification/ImageServer').then(response => {
      assert.equal(response.prop, 'value');
      let args = service.request.getCall(0).args;
      let url = args[0];
      assert.equal(url, 'http://landscape4qa.arcgis.com/arcgis/rest/services/USA_Soils_Hydric_Classification/ImageServer?f=json');
      assert.ok(service.request.calledOnce);
    });
  });
});
