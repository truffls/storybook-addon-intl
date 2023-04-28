export function validateConfig(config) {
    if (typeof config !== 'object') {
        return 'missing';
    } else if (
        !Array.isArray(config.locales) ||
        config.locales.some((value) => typeof value !== 'string')
    ) {
        return 'invalid-locales';
    } else if (typeof config.defaultLocale !== 'string') {
        return 'invalid-default-locale';
    } else if (typeof config.getMessages !== 'function') {
        return 'invalid-get-messages';
    } else if (!!config.getFormats && typeof config.getFormats !== 'function') {
        return 'invalid-get-formats';
    }

    return null;
}
