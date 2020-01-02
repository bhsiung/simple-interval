import Route from '@ember/routing/route';

export default class ClockIndexRoute extends Route {
  model() {
    const { clockConfig } = this.modelFor('clock');

    return { clockConfig };
  }
}
