import Ember from 'ember';
import { moduleFor } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';

moduleFor(
  'service:image-service',
  'Unit | Service | image service',
  {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  }
);

// Replace this with your real tests.
test('it exists', function (assert) {
  let service = this.subject();
  assert.ok(service);
});

test('getServerInfo takes url', function (assert) {
  let service = this.subject();
  this.stub(service, 'request', function (url, options) {
    return Ember.RSVP.resolve({ prop: 'value' });
  });
  return service.getServerInfo('http://landscape4qa.arcgis.com/arcgis/rest/services/USA_Soils_Hydric_Classification/ImageServer').then(response => {
    assert.equal(response.prop, 'value');
    let args = service.request.getCall(0).args;
    let url = args[0];
    assert.equal(url, 'http://landscape4qa.arcgis.com/arcgis/rest/services/USA_Soils_Hydric_Classification/ImageServer?f=json');
    assert.ok(service.request.calledOnce);
  });
});
