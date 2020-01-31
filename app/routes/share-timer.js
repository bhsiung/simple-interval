import Route from '@ember/routing/route';

export default class ShareTimerRoute extends Route {
  queryParams = {
    name: { refreshModel: true },
    round: { refreshModel: true },
    timeOff: { refreshModel: true },
    timeOn: { refreshModel: true },
  }
  setupController(controller, model) {
    super.setupController(controller, model);
    controller.eligibleToShare = !!controller.name && !!controller.round && !!controller.timeOn && !!controller.timeOff
  }
}
