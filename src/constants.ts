import { StorybookAddonIntlConfigCommon } from './types';

export const ADDON_ID = 'truffls/storybook-addon-intl';
export const PANEL_ID = `${ADDON_ID}/panel`;

export const PARAMETER_KEY = 'intl';
export const GLOBALS_KEY = 'intl';

export const EVENTS = {
    CONFIG_STATUS: `${ADDON_ID}/config_status`
};
export type EventsData = {
    CONFIG_STATUS: {
        config: StorybookAddonIntlConfigCommon | null;
        error: string | null;
    };
};
