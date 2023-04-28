import { AddonPanel } from '@storybook/components';
import { addons } from '@storybook/manager-api';
import React from 'react';
import { ADDON_ID, PANEL_ID } from '../constants';
import LocalePanel from './containers/LocalePanel';

addons.register(ADDON_ID, () => {
    addons.addPanel(PANEL_ID, {
        title: 'Locales',
        render: (props) => {
            return (
                <AddonPanel {...props}>
                    <LocalePanel />
                </AddonPanel>
            );
        }
    });
});
