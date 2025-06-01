import { useChannel, useGlobals } from 'storybook/manager-api';
import React, { Fragment, useState } from 'react';

import { EVENTS, EventsData, GLOBALS_KEY } from '../../constants';
import { parseState } from '../../state';
import { StorybookAddonIntlConfigCommon } from '../../types';
import { getActiveLocale } from '../../utils/locale';
import { LocalePanelContent } from '../components/LocalePanelContent';
import { Warning } from '../components/Warning';
import { Loading } from '../components/Loading';

export type LocalPanelProps = {
    active?: boolean;
};

export function LocalePanel({ active = false }: LocalPanelProps) {
    const [globals, updateGlobals] = useGlobals();
    const rawIntlGlobals = globals[GLOBALS_KEY];
    const intlState = parseState(rawIntlGlobals);

    const [{ config: intlConfig, error: parseError }, setIntlConfigState] =
        useState<{
            config: StorybookAddonIntlConfigCommon | null;
            error: string | null;
        }>({
            config: null,
            error: null
        });

    const locales = intlConfig?.locales ?? [];
    const activeLocale = getActiveLocale(
        locales,
        intlState.activeLocale,
        intlConfig?.defaultLocale
    );

    useChannel({
        [EVENTS.CONFIG_STATUS]: ({
            config,
            error
        }: EventsData['CONFIG_STATUS']) => {
            setIntlConfigState({
                config,
                error
            });
        }
    });

    const changeLocale = (nextActiveLocale: string) => {
        updateGlobals({
            [GLOBALS_KEY]: {
                activeLocale: nextActiveLocale
            }
        });
    };

    return (
        <div hidden={!active}>
            {!intlConfig || !activeLocale || !!parseError ? (
                <Fragment>
                    {!intlConfig || !parseError ? (
                        <Loading>Loading ...</Loading>
                    ) : (
                        <Warning>
                            {parseError === 'missing' ? (
                                <Fragment>
                                    <code>storybook-addon-intl</code> is not
                                    configured.
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <code>storybook-addon-intl</code> is not
                                    configured correctly.
                                    {` (code: ${parseError ?? 'unknown'})`}
                                </Fragment>
                            )}
                        </Warning>
                    )}
                </Fragment>
            ) : (
                <LocalePanelContent
                    locales={locales}
                    activeLocale={activeLocale}
                    onChangeLocale={changeLocale}
                />
            )}
        </div>
    );
}
