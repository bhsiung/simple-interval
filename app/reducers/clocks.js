const initState = [
  { name: 'INTENSIVE', round: 4, timeOn: 15000, timeOff: 30000 },
  { name: 'CARDIO', round: 8, timeOn: 20000, timeOff: 10000 },
  { name: '5x5', round: 5, timeOn: 20000, timeOff: 30000 }
];
const cachedInitStateJSON = window.localStorage && localStorage.getItem('clockConfig');
const cachedInitState = cachedInitStateJSON && JSON.parse(cachedInitStateJSON);

export default function clocks(state = cachedInitState || initState, action) {
  switch(action.type) {
    case 'newClock': {
      const newClocks = [...state, {
        name: action.name,
        round: action.round,
        timeOn: action.timeOn,
        timeOff: action.timeOff,
      }]
      localStorage.setItem('clockConfig', JSON.stringify(newClocks))
      return newClocks
    }
    case 'updateClock': {
      const newClocks = state.map((clock, index) => {
        if (index === action.clockId) {
          return {
            name: action.name,
            round: action.round,
            timeOn: action.timeOn,
            timeOff: action.timeOff,
          }
        }
        return clock
      })
      localStorage.setItem('clockConfig', JSON.stringify(newClocks))
      return newClocks
    }
    default:
      return state
  }
}
