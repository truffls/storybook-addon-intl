import React from 'react';
import addons from '@storybook/addons';
import WithIntl from './containers/WithIntl';
import { EVENT_SET_CONFIG_ID } from '../shared';
import { omit } from '../utils';

export let _config = null;

export const setIntlConfig = (config) => {
    _config = config;

    const channel = addons.getChannel();
    channel.emit(EVENT_SET_CONFIG_ID, {
        locales: config.locales,
        defaultLocale: config.defaultLocale
    });
};

export const withIntl = (story) => {
    const channel = addons.getChannel();

    const intlConfig = omit(_config, ['locales', 'getMessages']);

    return (
        <WithIntl intlConfig={intlConfig} locales={_config.locales} getMessages={_config.getMessages} channel={channel}>
            {story()}
        </WithIntl>
    );
};
