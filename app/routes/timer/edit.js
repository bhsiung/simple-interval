import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TimerEditRoute extends Route {
  @service redux
  headTags = [{
    type: 'meta',
    tagId: 'meta-description-tag',
    attrs: {
      name: 'description',
      content: 'You can customize the timer here by adjust the number of rounds, and durations'
    }
  }]
  model() {
    const { id } = this.paramsFor('timer')
    const timerConfig = this.redux.getState().timers[id]

    return { timerConfig, timerId: parseInt(id) };
  }
}
