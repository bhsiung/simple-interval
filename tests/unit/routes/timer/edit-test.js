import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | timer/edit', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:timer/edit');
    assert.ok(route);
  });
});
