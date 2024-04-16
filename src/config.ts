import { StorybookAddonIntlConfig } from './types';

type ParseConfigResult = {
    config: StorybookAddonIntlConfig | null;
    error: string | null;
};

export function parseConfig(config: unknown): ParseConfigResult {
    if (typeof config !== 'object' || config === null) {
        return { config: null, error: 'missing' };
    } else if (
        !('locales' in config) ||
        !Array.isArray(config.locales) ||
        config.locales.some((value) => typeof value !== 'string')
    ) {
        return { config: null, error: 'invalid-locales' };
    } else if (
        !('defaultLocale' in config) ||
        typeof config.defaultLocale !== 'string'
    ) {
        return { config: null, error: 'invalid-default-locale' };
    } else if (
        !('getMessages' in config) ||
        typeof config.getMessages !== 'function'
    ) {
        return { config: null, error: 'invalid-get-messages' };
    } else if (
        'getFormats' in config &&
        typeof config.getFormats !== 'function'
    ) {
        return { config: null, error: 'invalid-get-formats' };
    } else if (
        'defaultRichTextElements' in config &&
        (typeof config.defaultRichTextElements !== 'object' ||
            config.defaultRichTextElements === null ||
            Array.isArray(config.defaultRichTextElements))
    ) {
        return { config: null, error: 'invalid-rich-text-elements' };
    }
    return { config: config as StorybookAddonIntlConfig, error: null };
}
