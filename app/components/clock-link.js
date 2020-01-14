import Component from '@glimmer/component';
import { msToPrintable } from 'tabata/utils/time-functions'
import { inject as service } from '@ember/service';

export default class ClockLinkComponent extends Component {
  @service redux
  get pace () {
    const { round, timeOn, timeOff } = this.args.config
    return `${msToPrintable(timeOn)} - ${msToPrintable(timeOff)} x ${round}`;
  }

  get totalDuration() {
    const { round, timeOn, timeOff } = this.args.config
    const mseconds = round * timeOn + ( round - 1 ) * timeOff

    return msToPrintable(mseconds)
  }

  onDelete() {
    this.redux.dispatch({
      type: 'deleteClock',
      id: this.args.index
    })
  }
}
