import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | new-timer', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:new-timer');
    assert.ok(route);
  });
});
