import addons from '@storybook/addons';
import { register } from '../';
import { ADDON_ID, PANEL_ID } from '../../shared';
import LocalePanel from '../containers/LocalePanel';

describe('register', () => {
    test('register addon correctly', () => {
        //=== Before ===
        addons.loaders = {};


        //=== Test ===

        // Register addon
        register();
        // The addon should be registered
        expect(typeof addons.loaders[ADDON_ID]).toBe('function');


        //=== After ===
        addons.loaders = {};
    });

    test('register panel correctly', () => {
        //=== Before ===
        addons.loaders = {};
        addons.panels = {};
        addons.channel = {
            emit: () => {},
            on: () => {},
            removeListener: () => {}
        };


        //=== Test ===

        // Register addon
        register();
        // Register panel
        addons.loaders[ADDON_ID]();

        // The panel should be registered
        expect(typeof addons.panels[PANEL_ID]).toBe('object');

        // Check if the panel has correct values
        const panel = addons.panels[PANEL_ID];
        expect(panel.title).toBe('Locales');
        expect(typeof panel.render).toBe('function');

        // Check if render function returns correct element
        const element = panel.render({
            active: true
        });
        expect(element.type).toBe(LocalePanel);

        // Check if component receive correct props
        expect(element.props).toEqual({
            active: true,
            channel: addons.channel
        });


        //=== After ===
        addons.loaders = {};
        addons.panels = {};
        addons.channel = null;
    });

    test('register panel correctly with key', () => {
        //=== Before ===
        addons.loaders = {};
        addons.panels = {};
        addons.channel = {
            emit: () => {},
            on: () => {},
            removeListener: () => {}
        };


        //=== Test ===

        // Register addon
        register();
        // Register panel
        addons.loaders[ADDON_ID]();

        // The panel should be registered
        expect(typeof addons.panels[PANEL_ID]).toBe('object');

        // Check if the panel has correct values
        const panel = addons.panels[PANEL_ID];
        expect(panel.title).toBe('Locales');
        expect(typeof panel.render).toBe('function');

        // Check if render function returns correct element
        const element = panel.render({
            key: 'intl/panel',
            active: true
        });
        expect(element.type).toBe(LocalePanel);

        // Check if component receive correct props
        expect(element.props).toEqual({
            active: true,
            channel: addons.channel
        });
        expect(element.key).toEqual('intl/panel');


        //=== After ===
        addons.loaders = {};
        addons.panels = {};
        addons.channel = null;
    });
});
