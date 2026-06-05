/**
 * @param {number} x
 * @param {number} bestHrs
 * @param {number} bestHue
 * @param {number} worstHrs
 * @param {number} worstHue
 * @returns {number}
 */
export const linear = (x, bestHrs, bestHue, worstHrs, worstHue) => {
  const normalized = (x - worstHrs) / (bestHrs - worstHrs);
  const clamped = Math.max(Math.min(normalized, 1), 0);
  return (bestHue - worstHue) * clamped - worstHue;
};
