import Component from '@glimmer/component';

const STATUS_DONE = 'DONE'
const STATUS_ACTIVE = 'ACTIVE'
const STATUS_ONGOING = 'ONGOING'

/**
 * @param {number} total
 * @param {number} current
 */
export default class ProgressBar extends Component {
  get statuses() {
    const statuses = []
    const total = parseInt(this.args.total)
    const current = parseInt(this.args.current)
    for (let i=0; i<total; i++) {
      statuses[i] = i < current ? STATUS_DONE : (i === current ? STATUS_ACTIVE : STATUS_ONGOING)
    }
    return statuses
  }
}
