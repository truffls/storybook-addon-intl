import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

import WithIntl from '../';
import { EVENT_SET_LOCALE_ID, EVENT_GET_LOCALE_ID } from '../../../../shared';

describe('WithIntl', () => {
    test('initialize correctly', () => {
        let nextEventId = 1;
        const emittedMessages = [];
        const registeredListeners = [];

        const intlConfig = {
            fallbackLocale: 'en'
        };
        const locales = ['en', 'de'];
        const defaultLocale = 'en';
        const getMessages = () => ({ 'text': 'My Text' });
        const channel = {
            emit: (...args) => emittedMessages.push({ eventId: nextEventId++, args }),
            on: (...args) => registeredListeners.push({ eventId: nextEventId++, args }),
            removeListener: () => {}
        };

        const component = renderer.create(
            <WithIntl
                intlConfig={intlConfig}
                locales={locales}
                defaultLocale={defaultLocale}
                getMessages={getMessages}
                channel={channel}
            >
                <span />
            </WithIntl>
        );

        let instance = component.getInstance();

        expect(registeredListeners).toHaveLength(1);
        expect(registeredListeners[0].args).toEqual([ EVENT_SET_LOCALE_ID, instance.setLocale ]);

        expect(emittedMessages).toHaveLength(1);
        expect(emittedMessages[0].args).toEqual([ EVENT_GET_LOCALE_ID ]);

        expect(registeredListeners[0].eventId).toBeLessThan(emittedMessages[0].eventId);
    });

    test('unmount correctly', () => {
        const removedListeners = [];

        const intlConfig = {
            fallbackLocale: 'en'
        };
        const locales = ['en', 'de'];
        const defaultLocale = 'en';
        const getMessages = () => ({ 'text': 'My Text' });
        const channel = {
            emit: () => {},
            on: () => {},
            removeListener: (...args) => removedListeners.push(args)
        };

        const component = renderer.create(
            <WithIntl
                intlConfig={intlConfig}
                locales={locales}
                defaultLocale={defaultLocale}
                getMessages={getMessages}
                channel={channel}
            >
                <span />
            </WithIntl>
        );

        let instance = component.getInstance();

        component.unmount();
        expect(removedListeners).toHaveLength(1);
        expect(removedListeners[0]).toEqual([ EVENT_SET_LOCALE_ID, instance.setLocale ]);
    })

    test('set locale correctly', () => {
        const intlConfig = {
            fallbackLocale: 'en'
        };
        const locales = ['en', 'de'];
        const defaultLocale = 'en';
        const getMessages = () => ({ 'text': 'My Text' });
        const channel = {
            emit: () => {},
            on: () => {},
            removeListener: () => {}
        };
        const localeToSet = 'en';

        const component = renderer.create(
            <WithIntl
                intlConfig={intlConfig}
                locales={locales}
                defaultLocale={defaultLocale}
                getMessages={getMessages}
                channel={channel}
            >
                <span />
            </WithIntl>
        );

        const instance = component.getInstance();

        expect(instance.state).toEqual({ locale: null });

        instance.setLocale(localeToSet);
        expect(instance.state).toEqual({ locale: localeToSet });
    });

    test('renders correctly', () => {
        const intlConfig = {
            fallbackLocale: 'en'
        };
        const locales = ['en', 'de'];
        const defaultLocale = 'en';
        const getMessages = () => ({ 'text': 'My Text' });
        const channel = {
            emit: () => {},
            on: () => {},
            removeListener: () => {}
        };
        const children = (<span />);
        const localeToSet = 'en';

        const component = renderer.create(
            <WithIntl
                intlConfig={intlConfig}
                locales={locales}
                defaultLocale={defaultLocale}
                getMessages={getMessages}
                channel={channel}
            >
                {children}
            </WithIntl>
        );

        // We expect that the component renders null if not locale is set (which is the inital state)
        expect(component.toJSON()).toBe(null);

        let instance = component.getInstance();
        instance.setLocale(localeToSet);

        const expectedIntlProviderProps = {
            ...intlConfig,
            locale: localeToSet,
            messages: getMessages(localeToSet),
            children
        };

        const element = instance.render();
        expect(element.type).toBe(IntlProvider);
        expect(element.props).toEqual(expectedIntlProviderProps);
    });

    test('defaults locale to intlConfig.defaultLocale value', () => {
        const intlConfig = {
            defaultLocale: 'pt'
        };

        const locales = ['en', 'pt']

        const getMessages = () => ({ 'text': 'My Text' });
        const channel = {
            emit: () => {},
            on: () => {},
            removeListener: () => {}
        };

        const component = renderer.create(
            <WithIntl
                intlConfig={intlConfig}
                locales={locales}
                getMessages={getMessages}
                channel={channel}
            >
                <span />
            </WithIntl>
        );

        const instance = component.getInstance();

        expect(instance.state).toEqual({ locale: 'pt' });
    });
});
