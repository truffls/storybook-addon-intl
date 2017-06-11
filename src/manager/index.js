import React from 'react';
import addons from '@storybook/addons';
import LocalePanel from './containers/LocalePanel';
import { ADDON_ID, PANEL_ID } from '../shared';

export function register () {
    addons.register(ADDON_ID, () => {
        addons.addPanel(PANEL_ID, {
            title: 'Locales',
            render: () => (<LocalePanel channel={addons.getChannel()} />)
        });
    });
}
