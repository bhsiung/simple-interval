import Route from '@ember/routing/route';

export default class ClockIndexRoute extends Route {
  model() {
    const { id } = this.paramsFor('clock')

    return { id };
  }
}
