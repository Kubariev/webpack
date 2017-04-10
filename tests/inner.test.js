import Test from '../src/inner';

test('check test', () => {
  expect(Test.round()).toBe(12.12);
});