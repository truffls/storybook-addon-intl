import addons from '@kadira/storybook-addons';
import { register } from '../';
import { ADDON_ID, PANEL_ID } from '../../shared';
import LocalePanel from '../containers/LocalePanel';

describe('register', () => {
    test('register addon correctly', () => {
        //=== Before ===
        addons._loaders = {};


        //=== Test ===

        // Register addon
        register();
        // The addon should be registered
        expect(typeof addons._loaders[ADDON_ID]).toBe('function');


        //=== After ===
        addons._loaders = {};
    });

    test('register panel correctly', () => {
        //=== Before ===
        addons._loaders = {};
        addons._panels = {};
        addons._channel = {
            emit: () => {},
            on: () => {},
            removeListener: () => {}
        };


        //=== Test ===
        
        // Register addon
        register();
        // Register panel
        addons._loaders[ADDON_ID]();
        
        // The panel should be registered
        expect(typeof addons._panels[PANEL_ID]).toBe('object');

        // Check if the panel has correct values
        const panel = addons._panels[PANEL_ID];
        expect(panel.title).toBe('Locales');
        expect(typeof panel.render).toBe('function');

        // Check if render function returns correct element
        const element = panel.render();
        expect(element.type).toBe(LocalePanel);

        // Check if component receive correct props
        expect(element.props).toEqual({ channel: addons._channel });


        //=== After ===
        addons._loaders = {};
        addons._panels = {};
        addons._channel = null;
    });
});
