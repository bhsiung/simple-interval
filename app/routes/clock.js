import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ClockRoute extends Route {
  @service redux

  async model({ id }) {
    const { clocks } = this.redux.store.getState()

    return { clockConfig: clocks[id] }
  }
}
