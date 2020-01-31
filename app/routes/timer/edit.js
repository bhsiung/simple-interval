import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TimerEditRoute extends Route {
  @service redux
  model() {
    const { id } = this.paramsFor('timer')
    const timerConfig = this.redux.getState().timers[id]

    return { timerConfig, timerId: parseInt(id) };
  }
}
