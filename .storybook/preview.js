export const defaultLocales = ['en', 'de'];

// Provide your messages
const messages = {
    en: { message: 'Just some text.' },
    de: { message: 'Nur etwas Text.' },
    es: { message: 'Sólo un texto.' }
};

// Provide your formats (optional)
const formats = {
    en: {
        date: {
            custom: {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }
        }
    },
    de: {
        date: {
            custom: {
                year: '2-digit',
                month: 'numeric',
                day: 'numeric'
            }
        }
    }
};

const getMessages = (locale) => messages[locale];
const getFormats = (locale) => formats[locale];

/**
 * @type {import('@storybook/react').Preview}
 */
const preview = {
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
