import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking"
import { inject as service } from '@ember/service';

export default class ClockLinkComponent extends Component {
  @service router
  @service redux
  @tracked timeOn
  @tracked timeOff
  @tracked name
  @tracked round

  get totalDuration() {
    return this.round * this.timeOn + (this.round - 1) * this.timeOff
  }

  constructor() {
    super(...arguments)
    this.timeOn = this.args.timeOn
    this.timeOff = this.args.timeOff
    this.name = this.args.name
    this.round = this.args.round
  }
  onChange(type, e) {
    const supportedTypes = ['timeOff', 'timeOn', 'round', 'name']
    if (supportedTypes.indexOf(type) === -1) return
    this[type] = e.target.value
  }
  onSubmit(e) {
    const { timeOff, timeOn, round, name } = this;
    e.preventDefault();
    this.redux.dispatch({
      type: 'updateClock',
      clockId: this.args.clockId,
      timeOff,
      timeOn,
      round,
      name,
    })
    this.router.transitionTo('index')
  }
}
