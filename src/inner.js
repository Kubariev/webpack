import round from 'lodash/round';

export default class Test {
  static round() {
    const t = 12.1234123;

    return round(t, 2);
  }
}
