import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | progress-bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.current = 0
    await render(hbs`<ProgressBar @total=10 @current={{current}} />`);

    assert.dom('[data-test-progress-rect]').exists({count: 10})
    assert.dom('[data-test-progress-rect="DONE"]').doesNotExist()
    assert.dom('[data-test-progress-rect="ONGOING"]').exists({count: 9})
    assert.dom('[data-test-progress-rect="ACTIVE"]').exists({count: 1})

    this.set('current', 5)
    assert.dom('[data-test-progress-rect="DONE"]').exists({count: 5})
    assert.dom('[data-test-progress-rect="ONGOING"]').exists({count: 4})
    assert.dom('[data-test-progress-rect="ACTIVE"]').exists({count: 1})
  });
});
