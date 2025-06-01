import type { Decorator } from '@storybook/react';
import { useChannel, useEffect, useGlobals } from 'storybook/preview-api';
import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import { parseConfig } from '../../config';
import {
    EVENTS,
    EventsData,
    GLOBALS_KEY,
    PARAMETER_KEY
} from '../../constants';
import { parseState } from '../../state';
import { getActiveLocale } from '../../utils/locale';

export const withIntl: Decorator = (StoryFn, context) => {
    const { parameters } = context;
    const rawIntlConfig = parameters[PARAMETER_KEY];
    const { config: intlConfig, error: parseError } =
        parseConfig(rawIntlConfig);

    const emit = useChannel({});

    useEffect(() => {
        const eventData: EventsData['CONFIG_STATUS'] = {
            config: intlConfig
                ? {
                      defaultLocale: intlConfig.defaultLocale,
                      locales: intlConfig.locales
                  }
                : null,
            error: null
        };
        emit(EVENTS.CONFIG_STATUS, eventData);
    }, [intlConfig, parseError]);

    const [globals] = useGlobals();
    const rawIntlState = globals[GLOBALS_KEY];
    const intlState = parseState(rawIntlState);

    const locales = intlConfig?.locales ?? [];

    const activeLocale = getActiveLocale(
        locales,
        intlState.activeLocale,
        intlConfig?.defaultLocale
    );

    useEffect(() => {
        if (!!parseError || !activeLocale) {
            return;
        }

        document.documentElement.lang = activeLocale;
    }, [activeLocale]);

    if (!!parseError || !intlConfig || !activeLocale) {
        return <Fragment />;
    }

    const { getMessages, getFormats, defaultRichTextElements } = intlConfig;

    const messages = getMessages(activeLocale);
    const formats =
        typeof getFormats === 'function' ? getFormats(activeLocale) : undefined;

    return (
        <IntlProvider
            locale={activeLocale}
            messages={messages}
            formats={formats}
            defaultRichTextElements={defaultRichTextElements}
        >
            {StoryFn()}
        </IntlProvider>
    );
};
