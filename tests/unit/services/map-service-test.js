import { moduleFor, test } from 'ember-qunit';
import Service from '@ember/service';
moduleFor('service:map-service', 'Unit | Service | map service', {
  // Specify the other units that are required for this test.
  beforeEach() {
    this.register('service:session', Service.extend({}));
  }
});

// Replace this with your real tests.
test('it exists', function (assert) {
  let service = this.subject();
  assert.ok(service);
});
