import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class TimerIndexRoute extends Route {
  @service redux
  model() {
    const { id } = this.paramsFor('timer')
    const { timers: timerConfigs } = this.redux.store.getState()

    return { id, title: timerConfigs[id].name };
  }
}
