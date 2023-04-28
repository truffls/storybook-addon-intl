import React from 'react';
import { FormattedMessage } from 'react-intl';
import { defaultLocales } from '../preview';

const meta = {
    title: 'Example/01 Message'
};

export default meta;

export const Default = () => {
    return <FormattedMessage id="message" />;
};

export const PerStory = Default.bind(null);
PerStory.parameters = {
    intl: {
        locales: [...defaultLocales, 'es']
    }
};
