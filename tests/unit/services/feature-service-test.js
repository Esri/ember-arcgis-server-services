import Ember from 'ember';
import { moduleFor } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';

moduleFor('service:feature-service', 'Unit | Service | feature service', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function (assert) {
  let service = this.subject();
  assert.ok(service);
});

test('getLayerInfo takes url', function (assert) {
  let service = this.subject();
  this.stub(service, 'request', function (url, options) {
    return Ember.RSVP.resolve({prop: 'value'});
  });
  return service.getLayerInfo('http://foo.com/arcgis/rest/services/wat/featureserver')
  .then((response) => {
    assert.equal(response.prop, 'value');
    let args = service.request.getCall(0).args;
    let url = args[0];
    assert.equal(url, 'http://foo.com/arcgis/rest/services/wat/featureserver?f=json');
    assert.ok(service.request.calledOnce);
  });
});

test('getLayerInfo takes url and layerId', function (assert) {
  let service = this.subject();
  this.stub(service, 'request', function (url, options) {
    return Ember.RSVP.resolve({prop: 'value'});
  });
  return service.getLayerInfo('http://foo.com/arcgis/rest/services/wat/featureserver', {layer: 3})
  .then((response) => {
    assert.equal(response.prop, 'value');
    let args = service.request.getCall(0).args;
    let url = args[0];
    assert.equal(url, 'http://foo.com/arcgis/rest/services/wat/featureserver/3?f=json');
    assert.ok(service.request.calledOnce);
  });
});
