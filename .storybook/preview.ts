import { defaultLocales, formats, messages } from './intl';
import type { Preview } from '@storybook/react-vite';

import './preview.css';

const getMessages = (locale) => messages[locale];
const getFormats = (locale) => formats[locale];

const preview: Preview = {
    parameters: {
        intl: {
            locales: defaultLocales,
            defaultLocale: 'en',
            getMessages,
            getFormats
        }
    }
};

export default preview;
