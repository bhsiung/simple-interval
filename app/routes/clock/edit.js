import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ClockEditRoute extends Route {
  @service redux
  model() {
    const { id } = this.paramsFor('clock')
    const clockConfig = this.redux.getState().clocks[id]

    return { clockConfig, clockId: parseInt(id) };
  }
}
