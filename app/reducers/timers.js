const initState = [
  { name: 'INTENSIVE', round: 4, timeOn: 15000, timeOff: 30000 },
  { name: 'CARDIO', round: 8, timeOn: 20000, timeOff: 10000 },
  { name: '5x5', round: 5, timeOn: 20000, timeOff: 30000 }
];
const cachedInitStateJSON = window.localStorage && localStorage.getItem('timerConfig');
const cachedInitState = cachedInitStateJSON && JSON.parse(cachedInitStateJSON);

export default function timers(state = cachedInitState || initState, action) {
  switch(action.type) {
    case 'deleteTimer': {
      const newTimers = state.filter((timer, index) => index !== action.id)
      localStorage.setItem('timerConfig', JSON.stringify(newTimers))
      return newTimers
    }
    case 'newTimer': {
      const newTimers = [...state, {
        name: action.name,
        round: action.round,
        timeOn: action.timeOn,
        timeOff: action.timeOff,
      }]
      localStorage.setItem('timerConfig', JSON.stringify(newTimers))
      return newTimers
    }
    case 'updateTimer': {
      const newTimers = state.map((timer, index) => {
        if (index === action.timerId) {
          return {
            name: action.name,
            round: action.round,
            timeOn: action.timeOn,
            timeOff: action.timeOff,
          }
        }
        return timer
      })
      localStorage.setItem('timerConfig', JSON.stringify(newTimers))
      return newTimers
    }
    default:
      return state
  }
}
