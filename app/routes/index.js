import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service redux

  async model() {
    const { timers: timerConfigs } = this.redux.store.getState()

    return { timerConfigs }
  }
}
