import React from 'react';
import renderer from 'react-test-renderer';

import LocalePanel from '../';
import {
    EVENT_SET_CONFIG_ID,
    EVENT_GET_LOCALE_ID,
    EVENT_SET_LOCALE_ID
} from '../../../../shared';

describe('LocalePanel', () => {
    test('initialize correctly', () => {
        const channel = {
            emit: () => {},
            on: jest.fn(),
            removeListener: () => {}
        };


        const component = renderer.create(
            <LocalePanel active channel={channel} />
        );
        const instance = component.getInstance();


        expect(instance.state).toEqual({ locales: [], activeLocale: null });

        expect(channel.on.mock.calls).toContainEqual([ EVENT_SET_CONFIG_ID, instance.setConfig ]);
        expect(channel.on.mock.calls).toContainEqual([ EVENT_GET_LOCALE_ID, instance.getLocale ]);
    });

    test('set config correctly', () => {
        const channel = {
            emit: () => {},
            on: () => {},
            removeListener: () => {}
        };


        const component = renderer.create(
            <LocalePanel active channel={channel} />
        );
        const instance = component.getInstance();

        // After initialization
        instance.setConfig({ locales: ['en', 'de'], defaultLocale: 'en' });
        expect(instance.state).toEqual({ locales: ['en', 'de'], activeLocale: 'en' });

        // Initialized
        instance.setState({ locales: ['en', 'fr'], activeLocale: 'en' });

        instance.setConfig({ locales: ['en', 'de'], defaultLocale: 'en' });
        expect(instance.state).toEqual({ locales: ['en', 'de'], activeLocale: 'en' });

        // Initialized - current activeLocale not in locales anymore
        instance.setState({ locales: ['en', 'fr'], activeLocale: 'fr' });

        instance.setConfig({ locales: ['en', 'de'], defaultLocale: 'en' });
        expect(instance.state).toEqual({ locales: ['en', 'de'], activeLocale: 'en' });
    });

    test('emits locale correctly if requested', () => {
        const channel = {
            emit: jest.fn(),
            on: () => {},
            removeListener: () => {}
        };
        const activeLocale = 'en';


        const component = renderer.create(
            <LocalePanel active channel={channel} />
        );
        const instance = component.getInstance();


        instance.setState({ locales: ['en', 'de'], activeLocale: activeLocale });
        instance.getLocale();

        expect(channel.emit.mock.calls[0]).toEqual([ EVENT_SET_LOCALE_ID, activeLocale ]);
    });

    test('handles button click correctly', () => {
        const channel = {
            emit: jest.fn(),
            on: () => {},
            removeListener: () => {}
        };
        const localeToSet = 'de';


        const component = renderer.create(
            <LocalePanel active channel={channel} />
        );
        const instance = component.getInstance();


        instance.setState({ locales: ['en', 'de'], activeLocale: 'en' });

        instance.handleClickLocaleButton(localeToSet);
        expect(instance.state).toEqual({ locales: ['en', 'de'], activeLocale: localeToSet });

        expect(channel.emit.mock.calls[0]).toEqual([ EVENT_SET_LOCALE_ID, localeToSet ]);
    });

    test('unmount correctly', () => {
        const channel = {
            emit: () => {},
            on: () => {},
            removeListener: jest.fn()
        };


        const component = renderer.create(
            <LocalePanel active channel={channel} />
        );
        const instance = component.getInstance();


        component.unmount();
        expect(channel.removeListener.mock.calls).toContainEqual([ EVENT_SET_CONFIG_ID, instance.setConfig ]);
        expect(channel.removeListener.mock.calls).toContainEqual([ EVENT_GET_LOCALE_ID, instance.getLocale ]);
    });

    test('renders correctly when inactive', () => {
        const channel = {
            emit: () => {},
            on: () => {},
            removeListener: jest.fn()
        };

        const component = renderer.create(
            <LocalePanel active={false} channel={channel} />
        );
        const instance = component.getInstance();

        // If active is false we expect null as return value of the render function
        let tree = component.toJSON();
        expect(tree).toBe(null);
    });

    test('renders correctly when active', () => {
        const channel = {
            emit: () => {},
            on: () => {},
            removeListener: jest.fn()
        };


        const component = renderer.create(
            <LocalePanel active channel={channel} />
        );
        const instance = component.getInstance();

        // If not locale is set (which is the inital state) we expect null as return value of the render function
        let tree = component.toJSON();
        expect(tree).toBe(null);


        instance.setState({ locales: ['en', 'de'], activeLocale: 'en' });
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly with key', () => {
        const channel = {
            emit: () => {},
            on: () => {},
            removeListener: jest.fn()
        };


        const component = renderer.create(
            <LocalePanel key="intl/panel" active channel={channel} />
        );
        const instance = component.getInstance();

        let tree = component.toJSON();
        expect(tree).toBe(null);


        instance.setState({ locales: ['en', 'de'], activeLocale: 'en' });
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});
