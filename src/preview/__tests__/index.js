import addons from '@storybook/addons';
import { setIntlConfig, withIntl } from '../';
import { EVENT_SET_CONFIG_ID } from '../../shared';
import { omit } from '../../utils';
import WithIntl from '../containers/WithIntl';

describe('setIntlConfig', function () {
    test('should set config', function () {
        //=== Before ===
        const messages = [];
        addons.channel = {
            emit: (...args) => messages.push(args),
        };


        //=== Test ===
        const config = {
            locales: ['en', 'de'],
            defaultLocale: 'en',
            getMessages: () => ({ 'text': 'Lorem ipsum' }),
            getFormats: () => ({ 'date': { 'year-only': { 'year': '2-digit' } } }),
            unkownProperty: true
        };
        const expectedConfig = {
            locales: config.locales,
            defaultLocale: config.defaultLocale
        };

        setIntlConfig(config);

        expect(messages[0]).toEqual([ EVENT_SET_CONFIG_ID, expectedConfig ]);


        //=== After ===
        addons.channel = null;
    });
});

describe('withIntl', () => {
    test('should return instance of component WithIntl', () => {
        //=== Before ===
        addons.channel = {
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
        addons.channel = null;
    });

    test('should pass correct props to component', () => {
        //=== Before ===
        addons.channel = {
            emit: () => {},
            on: () => {},
            removeListener: () => {}
        };

        //=== Test ===
        const story = () => null;

        const config = {
            locales: ['en', 'de'],
            defaultLocale: 'en',
            getMessages: () => ({ 'text': 'Lorem ipsum' }),
            getFormats: () => ({ 'date': { 'year-only': { 'year': '2-digit' } } }),
        };

        const expectedProps = {
            intlConfig: omit(config, ['locales', 'getMessages', 'getFormats']),
            locales: config.locales,
            getMessages: config.getMessages,
            getFormats: config.getFormats,
        };

        // Set the configuraton
        setIntlConfig(config);

        // Get instance of component
        const element = withIntl(story);

        // Check if props match
        expect(element.props).toEqual({
            ...expectedProps,
            channel: addons.channel,
            children: story()
        });


        //=== After ===
        addons.channel = null;
    });
});
