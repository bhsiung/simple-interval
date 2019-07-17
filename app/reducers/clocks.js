const initState = [
  { name: 'high intense', round: 4, timeOn: 15000, timeOff: 30000 },
  { name: 'cardio', round: 8, timeOn: 20000, timeOff: 10000 },
  { name: '5x5', round: 5, timeOn: 20000, timeOff: 30000 }
];

export default function clocks(state, action) {
  return state || initState
}
