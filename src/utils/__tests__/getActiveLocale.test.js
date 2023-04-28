import { getActiveLocale } from '../getActiveLocale';

it(`should return null if locale is an array `, () => {
    expect(getActiveLocale(null, 'de', 'en')).toBe(null);
});

it(`should return default locale if active locale doesn't have a value`, () => {
    expect(getActiveLocale(['en', 'de'], null, 'en')).toBe('en');
});

it(`should return null if default locale is not a valid locale`, () => {
    expect(getActiveLocale(['en', 'de'], null, 'es')).toBe(null);
});

it(`should return active locale if it's a valid locale`, () => {
    expect(getActiveLocale(['en', 'de'], 'de', 'en')).toBe('de');
});

it(`should return default locale if active locale is not a valid locale`, () => {
    expect(getActiveLocale(['en', 'de'], 'es', 'en')).toBe('en');
});
