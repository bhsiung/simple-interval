import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | share-timer', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:share-timer');
    assert.ok(route);
  });
});
