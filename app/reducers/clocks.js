const initState = [{ name: 'high intense', round: 3, timeOn: 5000, timeOff: 1000 }, { name: 'cardio', round: 3, timeOn: 30, timeOff: 10 }];

export default function clocks(state, action) {
  return state || initState
}
