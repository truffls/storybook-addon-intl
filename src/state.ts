import { StorybookAddonIntlState } from './types';

export function parseState(state: unknown): StorybookAddonIntlState {
    if (
        typeof state !== 'object' ||
        state === null ||
        !('activeLocale' in state) ||
        typeof state.activeLocale !== 'string'
    ) {
        return { activeLocale: null };
    }

    return {
        activeLocale: state.activeLocale
    };
}
