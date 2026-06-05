/** @param {number} num */
function pad(num) {
  const str = num.toString();
  return Array.from({ length: 2 - str.length }, () => '0').join() + str;
}

export default class Time {
  /** @param {string} time */
  static fromString(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return new Time(hours, minutes);
  }

  /** @param {number} total */
  static fromMinutes(total) {
    const hours = Math.ceil(total / 60)
    const minutes = total % 60
    return new Time(hours, minutes);
  }

  /**
   * @param {number} hours
   * @param {number} minutes
   */
  constructor(hours, minutes) {
    this.hours = hours;
    this.minutes = minutes;
  }

  wrapped(sure = false) {
    const num = this.hours;
    if (num > 18 && !sure) return new Time(this.hours, this.minutes);
    return new Time(24 + this.hours, this.minutes);
  }

  toHours() {
    return this.hours;
  }

  toMinutes() {
    return this.hours * 60 + this.minutes;
  }

  toString() {
    return `${pad(this.hours)}:${pad(this.minutes)}`;
  }
}
