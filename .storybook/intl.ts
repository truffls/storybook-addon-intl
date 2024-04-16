export const defaultLocales = ['en', 'de'];

// Provide your messages
export const messages = {
    en: { message: 'Just some text.' },
    de: { message: 'Nur etwas Text.' },
    es: { message: 'Sólo un texto.' }
};

// Provide your formats (optional)
export const formats = {
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
