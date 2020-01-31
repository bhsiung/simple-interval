import Component from '@glimmer/component'
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking"
import { action } from '@ember/object'
import { msToPrintable } from 'tabata/utils/time-functions'
import { htmlSafe } from '@ember/template';
import { cancel, later } from '@ember/runloop';

const STATE_PREP = 'STATE_PREP'
const STATE_WORKOUT = 'STATE_WORKOUT'
const STATE_REST = 'STATE_REST'
const PREP_DURATION = 3000
const TIMER_INTERVAL = 10

const SOUND_OCCASSION_END = 'end'
const SOUND_OCCASSION_START = 'start'
const SOUND_OCCASSION_BREAK = 'break'
const SOUND_FILE_MAP = {
  [SOUND_OCCASSION_START]: '/sounds/break.mp3',
  [SOUND_OCCASSION_BREAK]: '/sounds/break.mp3',
  [SOUND_OCCASSION_END]: '/sounds/end.mp3'
}

function generateTimers({ round, timeOff, timeOn }) {
  const timers = [{state:STATE_PREP,duration:PREP_DURATION}]
  for(let i=0; i<round; i++) {
    timers.push({state: STATE_WORKOUT, duration: parseInt(timeOn)})
    if (i<round-1) timers.push({state: STATE_REST, duration: parseInt(timeOff)})
  }
  return timers
}

function calculatorTotalDuration(timers) {
  return timers.reduce((total, { duration }) => total + duration, 0)
}

/**
 * main timer component
 *
 * @param {number} [id] - numeric timer id, map to store
 * @param {number} [id] - numeric timer id, map to store
 * @extends {Component}
 */
export default class ClockComponent extends Component {
  @service router
  @service redux
  @tracked currentTimerRemaining
  @tracked totalTimerRemaining
  @tracked currentRound
  @tracked timerIndex
  @tracked started
  @tracked paused
  @tracked completed

  get config() {
    return this.args.id === undefined ?
      {
        name: this.args.name,
        round: this.args.round,
        timeOn: this.args.timeOn,
        timeOff: this.args.timeOff
      }:
      this.redux.getState().clocks[this.args.id]
  }

  get progress() {
    return this.currentTimerRemaining / this.timers[this.timerIndex].duration
  }

  get totalProgress() {
    return this.totalTimerRemaining / this.totalDuration
  }

  get currentDuration() {
    return msToPrintable(this.timers[this.timerIndex].duration)
  }

  get second() {
    return msToPrintable(this.currentTimerRemaining)
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
    if (!this.started) return htmlSafe('CLICK TO START<br><span class="oi oi-heart breathing-font" data-glyph="heart" aria-hidden="true"></span>')
    if (timerState === STATE_PREP) return "GET READY..."
    else if (timerState === STATE_REST) return "REST"
    else if (timerState === STATE_WORKOUT) return "BEGIN"
    else throw new Error('something wrong')
  }

  constructor() {
    super(...arguments)
    this.state = STATE_PREP
    this.timers = generateTimers(this.config)
    this.totalDuration = calculatorTotalDuration(this.timers)
    this.resetTimer()
  }

  willDestroy() {
    cancel(this.timer)
  }

  resetTimer() {
    this.paused = false
    this.started = false
    this.completed = false
    this.timerIndex = 0
    this.currentRound = 0
    this.currentTimerRemaining = this.timers[0].duration
    this.totalTimerRemaining = this.totalDuration
  }

  playSound(occassion) {
    this.sound = new Audio(SOUND_FILE_MAP[occassion])
    this.sound.play()
  }

  pauseSound() {
    this.sound.pause()
  }

  speak(content) {
    if (window && window.speechSynthesis) {
      const utter = new SpeechSynthesisUtterance(content)
      utter.lang = 'en-US'
      window.speechSynthesis.speak(utter)
    }
  }

  loop() {
    // still running the same timer
    if (this.currentTimerRemaining > 0) {
      this.currentTimerRemaining -= TIMER_INTERVAL
      this.totalTimerRemaining -= TIMER_INTERVAL
      if (this.currentTimerRemaining === 3500) this.speak('3')
      if (this.currentTimerRemaining === 2500) this.speak('2')
      if (this.currentTimerRemaining === 1500) this.speak('1')
      this.timer = later(this, this.loop, TIMER_INTERVAL)
      return
    }
    // the last round
    if (this.timerIndex >= this.timers.length - 1) {
      this.completed = true
      // this.playSound(SOUND_OCCASSION_END)
      this.speak('congraturation')
      return
    }
    // shift to the next timer
    if (this.timers[this.timerIndex].state === STATE_REST) {
      this.currentRound++
      // this.playSound(SOUND_OCCASSION_START)
      this.speak('start workout')
    } else if (this.timers[this.timerIndex].state === STATE_WORKOUT) {
      // this.playSound(SOUND_OCCASSION_BREAK)
      this.speak('take a rest')
    } else if (this.timers[this.timerIndex].state === STATE_PREP) {
      this.speak('start workout')
    }
    this.timerIndex++
    this.currentTimerRemaining = this.timers[this.timerIndex].duration
    this.timer = later(this, this.loop, TIMER_INTERVAL)
  }

  @action
  handleStop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.started = false
    this.paused = false
    cancel(this.timer)
    this.resetTimer()
    return false;
  }

  @action
  handleMainAction() {
    if (!this.shouldShowTimer) {
      if (this.completed) this.resetTimer()

      if (!this.started || this.paused) {
        this.started = true
        this.paused = false
        this.timer = later(this, this.loop, TIMER_INTERVAL)
      }
      return
    }
    if (this.paused) {
      this.paused = false;
      this.timer = later(this, this.loop, TIMER_INTERVAL)
    } else {
      this.paused = true
      cancel(this.timer)
    }
  }
}
