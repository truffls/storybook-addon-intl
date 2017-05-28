import { omit } from '../utils';

test('omit shoudl return correct value', () => {
    const actual = { 'foo': 'FOO', 'one': 1, 'bar': 'BAR', 'two': 2 };
    const expected = { 'foo': 'FOO', 'bar': 'BAR' };

    expect(omit(actual, ['one', 'two'])).toEqual(expected);
});
