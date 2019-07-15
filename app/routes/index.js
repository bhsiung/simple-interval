import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service redux

  async model() {
    const { clocks: clockConfigs } = this.redux.store.getState()

    return { clockConfigs }
  }
}
