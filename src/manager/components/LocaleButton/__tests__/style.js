import style, { defaultStyle, activeStyle } from '../style';

test('returns correct style if not active', () => {
    const actual = style({ active: false });
    const expected = defaultStyle;

    expect(actual).toEqual(expected);
});

test('returns correct style if active', () => {
    const actual = style({ active: true });
    const expected = { ...defaultStyle, ...activeStyle };

    expect(actual).toEqual(expected);
});
