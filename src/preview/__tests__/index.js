import addons from '@kadira/storybook-addons';
import { setIntlConfig, withIntl } from '../';
import { EVENT_SET_CONFIG_ID } from '../../shared';
import { omit } from '../../utils';
import WithIntl from '../containers/WithIntl';

describe('setIntlConfig', function () {
    test('should set config', function () {
        //=== Before ===
        const messages = [];
        addons._channel = {
            emit: (...args) => messages.push(args),
        };


        //=== Test ===
        const config = {
            locales: ['en', 'de'],
            defaultLocale: 'en',
            getMessages: () => ({ 'text': 'Lorem ipsum' }),
            unkownProperty: true
        };
        const expectedConfig = {
            locales: config.locales,
            defaultLocale: config.defaultLocale
        };

        setIntlConfig(config);

        expect(messages[0]).toEqual([ EVENT_SET_CONFIG_ID, expectedConfig ]);


        //=== After ===
        addons._channel = null;
    });
});

describe('withIntl', () => {
    test('should return instance of component WithIntl', () => {
        //=== Before ===
        addons._channel = {
            emit: () => {},
            on: () => {},
            removeListener: () => {}
        };


        //=== Test ===
        const story = () => null;

        // Get instance of component
        const element = withIntl(story);

        // Check if type is correct
        expect(element.type).toBe(WithIntl);


        //=== After ===
        addons._channel = null;
    });

    test('should pass correct props to component', () => {
        //=== Before ===
        addons._channel = {
            emit: () => {},
            on: () => {},
            removeListener: () => {}
        };

        //=== Test ===
        const story = () => null;

        const config = {
            locales: ['en', 'de'],
            defaultLocale: 'en',
            getMessages: () => ({ 'text': 'Lorem ipsum' })
        };

        const expectedProps = {
            intlConfig: omit(config, ['locales', 'getMessages']),
            locales: config.locales,
            getMessages: config.getMessages
        };

        // Set the configuraton
        setIntlConfig(config);

        // Get instance of component
        const element = withIntl(story);

        // Check if props match
        expect(element.props).toEqual({
            ...expectedProps,
            channel: addons._channel,
            children: story()
        });


        //=== After ===
        addons._channel = null;
    });
});
