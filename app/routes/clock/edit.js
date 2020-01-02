import Route from '@ember/routing/route';

export default class ClockEditRoute extends Route {
  model() {
    const { clockConfig } = this.modelFor('clock');
    const { id } = this.paramsFor('clock')

    return { clockConfig, clockId: parseInt(id) };
  }
}
