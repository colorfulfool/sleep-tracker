/** 
 * @param {Array<string>} rows 
 * @return {Generator<string[], void, void>}
 **/
export default function* everyDay(rows) {
  let currentDate;
  while (true) {
    const currentRow = rows.shift()?.split(',');

    if (!currentRow) {
      return;
    }

    if (!currentDate) {
      currentDate = new Date(currentRow[0]);
    }

    while (new Date(currentRow[0]).getTime() - currentDate.getTime() > 1000 * 60 * 60 * 24) {
      currentDate.setDate(currentDate.getDate() + 1);
      yield [currentDate.toISOString().split('T')[0], '', ''];
    }

    currentDate = new Date(currentRow[0]);
    yield currentRow;
  }
}
