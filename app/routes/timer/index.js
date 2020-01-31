import Route from '@ember/routing/route';

export default class TimerIndexRoute extends Route {
  model() {
    const { id } = this.paramsFor('timer')

    return { id };
  }
}
