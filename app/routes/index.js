import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    return {
      clockConfigs: [
        { name: 'high intense', round: 3, timeOn: 5000, timeOff: 1000 },
        { name: 'cardio', round: 3, timeOn: 30, timeOff: 10 }
      ]
    }
  }
}
