import Component from '@glimmer/component';
import { msToPrintable } from 'tabata/utils/time-functions'
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ClockLinkComponent extends Component {
  @service redux
  @service router
  @tracked isShareModalOpen
  @tracked shareableUrl

  get pace () {
    const { round, timeOn, timeOff } = this.args.config
    return `${msToPrintable(timeOn)} - ${msToPrintable(timeOff)} x ${round}`;
  }

  get totalDuration() {
    const { round, timeOn, timeOff } = this.args.config
    const mseconds = round * timeOn + ( round - 1 ) * timeOff

    return msToPrintable(mseconds)
  }
  onShare(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isShareModalOpen = true
    const { name, round, timeOn, timeOff } = this.args.config
    const hostname = 'http://www.simpleinterval.com'
    this.shareableUrl = `${hostname}/share-timer?name=${name}&round=${round}&timeOn=${timeOn}&timeOff=${timeOff}`

    return false;
  }
  onCopy(e) {
    e.target.select();
    document.execCommand('copy');
  }
  onDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`are you sure to delete ${this.args.config.name}?`)) {
      this.redux.dispatch({
        type: 'deleteClock',
        id: parseInt(this.args.index)
      })
      this.router.transitionTo('index')
    }
    return false;
  }
}
