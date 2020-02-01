import Component from '@glimmer/component';
import { msToPrintable } from 'tabata/utils/time-functions'
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TimerLinkComponent extends Component {
  @service redux
  @service router
  @tracked isShareModalOpen
  @tracked isDeleteModalOpen
  @tracked urlCopied = false
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
    this.urlCopied = false
    const { name, round, timeOn, timeOff } = this.args.config
    const hostname = 'http://simpleinterval.com'
    this.shareableUrl = `${hostname}/share-timer?name=${name}&round=${round}&timeOn=${timeOn}&timeOff=${timeOff}`

    return false;
  }
  onCopy(e) {
    e.target.select();
    document.execCommand('copy');
    this.urlCopied = true
  }
  onDeleteConfirm(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isDeleteModalOpen = true
    return false;
  }
  onDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isDeleteModalOpen = false
    this.redux.dispatch({
      type: 'deleteTimer',
      id: parseInt(this.args.index)
    })
    this.router.transitionTo('index')
    return false;
  }
  onEdit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.router.transitionTo('timer.edit', { id: this.args.index })
    return false;
  }
}
