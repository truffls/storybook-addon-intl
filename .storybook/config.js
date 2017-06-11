import { addDecorator, configure } from '@storybook/react';
import { setIntlConfig, withIntl } from '../dist';

// Load the locale data for all your defined locales
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import deLocaleData from 'react-intl/locale-data/de';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

// Provide your messages
const messages = {
    'en': { 'button.label': 'Click me!' },
    'de': { 'button.label': 'Klick mich!' }
};

const getMessages = (locale) => messages[locale];

// Set intl configuration
setIntlConfig({
    locales: ['en', 'de'],
    defaultLocale: 'en',
    getMessages
});

// Register decorator
addDecorator(withIntl);


// Run storybook
configure(() => require('./stories'), module);
