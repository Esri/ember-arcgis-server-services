import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';
import test from 'ember-sinon-qunit/test-support/test';

module('Unit | Service | feature service', function(hooks) {
  setupTest(hooks);

  // Specify the other units that are required for this test.
  hooks.beforeEach(function() {
    this.owner.register('service:session', Service.extend({}));
  });

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:feature-service');
    assert.ok(service);
  });
});
