const initState = [
  { name: 'HIGH INTENSE', round: 4, timeOn: 15000, timeOff: 30000 },
  { name: 'CARDIO', round: 8, timeOn: 20000, timeOff: 10000 },
  { name: '5x5', round: 5, timeOn: 20000, timeOff: 30000 }
];

export default function clocks(state = initState, action) {
  switch(action.type) {
    case 'updateClock':
      return state.map((clock, index) => {
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
    default:
      return state
  }
}
