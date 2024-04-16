export function getActiveLocale(
    locales: string[],
    activeLocale: string | null | undefined,
    defaultLocale: string | null | undefined
): string | null {
    if (!!activeLocale && locales.includes(activeLocale)) {
        return activeLocale;
    }

    if (!!defaultLocale && locales.includes(defaultLocale)) {
        return defaultLocale;
    }

    return null;
}
