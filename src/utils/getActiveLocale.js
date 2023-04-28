export function getActiveLocale(locales, activeLocale, defaultLocale) {
    if (!Array.isArray(locales)) {
        return null;
    }

    if (!!activeLocale && locales.includes(activeLocale)) {
        return activeLocale;
    }

    if (!!defaultLocale && locales.includes(defaultLocale)) {
        return defaultLocale;
    }

    return null;
}
