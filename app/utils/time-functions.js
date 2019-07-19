/**
 * Convert number in ms to MM:SS
 *
 * @returns {string}
 */
export function msToPrintable(ms) {
  const int = Math.round(ms/1000)
  const m = Math.ceil(int / 60)
  const s = int % 60

  return `${m}:${s}`
}
