import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TimerRoute extends Route {
  @service redux

  async model({ id }, transition) {
    const { timers } = this.redux.store.getState()
    const timerConfig = timers[parseInt(id)]

    if (!timerConfig) {
      transition.abort()
      this.transitionTo('not-found')
    }
  }
}
