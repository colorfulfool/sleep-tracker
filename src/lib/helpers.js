/** @param {string} url */
export async function readResponse(url) {
  const resp = await fetch(url, { cache: 'no-store' });
  const text = await resp.text();
  return text.split('\n').filter(row => row.length)
}

/**
 * @param {string[]} items
 * @param {(item: string) => string} criterion
 */
export function divideBy(items, criterion) {
  let currentCriterion;
  const groups = [];

  items.forEach((item) => {
    if (criterion(item) !== currentCriterion) {
      groups.push([]);
      currentCriterion = criterion(item);
    }
    groups[groups.length - 1].push(item);
  });

  return groups;
}
