import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | circle', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<Circle @radius={{100}} />`);
    debugger
    assert.dom('[data-test-name="component-circle"]').hasAttribute('width', 100)
  });

  test('it renders', async function(assert) {
    await render(hbs`<Circle />`);
    assert.equal(this.element.textContent.trim(), '');
  });
});
