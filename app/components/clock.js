import Component from '@glimmer/component'
import { tracked } from "@glimmer/tracking"
import { action } from '@ember/object'

const STATE_PREP = 'STATE_PREP'
const STATE_WORKOUT = 'STATE_WORKOUT'
const STATE_REST = 'STATE_REST'
const PREP_DURATION = 3000
const TIMER_INTERVAL = 10

function generateTimers({ round, timeOff, timeOn }) {
  const timers = [{state:STATE_PREP,duration:PREP_DURATION}]
  for(let i=0; i<round; i++) {
    timers.push({state: STATE_WORKOUT, duration: timeOn})
    if (i<round-1) timers.push({state: STATE_REST, duration: timeOff})
  }
  return timers
}

export default class ClockComponent extends Component {
  @tracked timeRemaining
  @tracked currentRound
  @tracked timerIndex
  @tracked started
  @tracked paused
  @tracked completed

  // get dashOffset() {
    // return (this.timeRemaining / this.timers[0].duration) * -924
  // }
  get dash() {
    return `${(this.timeRemaining / this.timers[this.timerIndex].duration) * -301.59}%`
  }

  get second() {
    return (this.timeRemaining / 1000).toFixed(2).replace(/\./, ':')
  }

  get shouldShowTimer() {
    return this.started && !this.completed
  }

  get timerState() {
    return this.timers[this.timerIndex].state
  }

  get statusText() {
    const timerState = this.timers[this.timerIndex].state

    if (this.paused) return 'Pause'
    if (this.completed) return 'GREAT JOB!'
    if (!this.started) return 'LET\' GO'
    if (timerState === STATE_PREP) return "GET READY..."
    else if (timerState === STATE_REST) return "REST"
    else if (timerState === STATE_WORKOUT) return "GO GO GO!!"
    else throw new Error('something wrong')
  }

  constructor() {
    super(...arguments)
    this.state = STATE_PREP
    this.timers = generateTimers(this.args.config)
    this.resetTimer()
  }

  resetTimer() {
    this.paused = false
    this.started = false
    this.completed = false
    this.timerIndex = 0
    this.currentRound = 1
    this.timeRemaining = this.timers[0].duration
  }

  loop() {
    // still running the same timer
    if (this.timeRemaining > 0) {
      this.timeRemaining -= TIMER_INTERVAL
      return
    }
    // the last round
    if (this.timerIndex >= this.timers.length - 1) {
      clearInterval(this.timer)
      this.completed = true
      return
    }
    // shift to the next timer
    if (this.timers[this.timerIndex].state === STATE_REST) this.currentRound++
    this.timerIndex++
    this.timeRemaining = this.timers[this.timerIndex].duration
  }

  @action
  handleStart(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.completed) this.resetTimer()

    if (!this.started || this.paused) {
      this.started = true
      this.paused = false
      // use runloop
      this.timer = setInterval(this.loop.bind(this), TIMER_INTERVAL)
    }
    return false;
  }

  @action
  handleStop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.started = false
    this.paused = false
    clearInterval(this.timer)
    this.resetTimer()
    return false;
  }

  @action
  handleMainAction(e) {
    if (this.args.type === 'link') {
      return this.args.gotoPage();
    }
    if (!this.shouldShowTimer) return this.handleStart(e);
    if (this.paused) {
      this.paused = false;
      this.timer = setInterval(this.loop.bind(this), TIMER_INTERVAL)
    } else {
      this.paused = true
      clearInterval(this.timer)
    }
  }
}