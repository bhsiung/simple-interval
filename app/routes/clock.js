import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ClockRoute extends Route {
  @service redux

  async model({ id }, transition) {
    const { clocks } = this.redux.store.getState()
    const clockConfig = clocks[parseInt(id)]

    if (!clockConfig) {
      transition.abort()
      this.transitionTo('not-found')
    }

    return { clockConfig }
  }
}
