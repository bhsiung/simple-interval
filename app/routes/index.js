import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    return {
      clockConfigs: [
        { name: 'high intense' },
        { name: 'cardio' }
      ]
    }
  }
}
