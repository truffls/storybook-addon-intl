import { addons, types } from 'storybook/manager-api';
import { ADDON_ID, PANEL_ID } from './constants';
import { LocalePanel } from './manager/containers/LocalePanel';

addons.register(ADDON_ID, () => {
    addons.add(PANEL_ID, {
        type: types.PANEL,
        title: 'Locales',
        render: LocalePanel
    });
});
