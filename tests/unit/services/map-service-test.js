import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Service from '@ember/service';

module('Unit | Service | map service', function(hooks) {
  setupTest(hooks);

  // Specify the other units that are required for this test.
  hooks.beforeEach(function() {
    this.owner.register('service:session', Service.extend({}));
  });

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:map-service');
    assert.ok(service);
  });
});
