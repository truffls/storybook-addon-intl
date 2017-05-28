import React from 'react';
import renderer from 'react-test-renderer';

import LocaleButton from '../';

describe('LocaleButton', () => {
    test('renders correctly', () => {
        const locale = 'en';
        const onClick = () => {};

        const tree = renderer.create(
            <LocaleButton locale={locale} onClick={onClick} />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('handles click correctly', () => {
        const locale = 'en';
        const onClick = jest.fn();
        const event = { preventDefault: jest.fn() };

        const component = renderer.create(
            <LocaleButton locale={locale} onClick={onClick} />
        );

        const tree = component.toJSON();
        tree.props.onClick(event);

        expect(event.preventDefault.mock.calls).toHaveLength(1);
        expect(onClick.mock.calls).toHaveLength(1);
        expect(onClick.mock.calls[0][0]).toBe(locale);
    });
})
