import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking"
import { inject as service } from '@ember/service';

const DEFAULT_TIME_ON = 30000
const DEFAULT_TIME_OFF = 30000
const DEFAULT_NAME = 'New'
const DEFAULT_ROUND = 4

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
    this.timeOn = this.args.timeOn || DEFAULT_TIME_ON
    this.timeOff = this.args.timeOff || DEFAULT_TIME_OFF
    this.name = this.args.name || DEFAULT_NAME
    this.round = this.args.round || DEFAULT_ROUND
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
      type: 'newClock',
      timeOff,
      timeOn,
      round,
      name,
    })
    this.router.transitionTo('index')
  }
}
