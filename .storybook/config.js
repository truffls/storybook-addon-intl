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

// Provide your formats (optional)
const formats = {
    'en': {
            'date': {
                'custom': {
                    'year': 'numeric',
                    'month': '2-digit',
                    'day': '2-digit',
                },
            },
        },
    'de': {
            'date': {
                'custom': {
                    'year': '2-digit',
                    'month': 'numeric',
                    'day': 'numeric',
                },
            },
        },
};

const getMessages = (locale) => messages[locale];
const getFormats = (locale) => formats[locale];

// Set intl configuration
setIntlConfig({
    locales: ['en', 'de'],
    defaultLocale: 'en',
    getMessages,
    getFormats
});

// Register decorator
addDecorator(withIntl);


// Run storybook
configure(() => require('./stories'), module);
