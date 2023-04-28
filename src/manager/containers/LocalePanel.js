import { useGlobals, useParameter } from '@storybook/manager-api';
import React, { Fragment } from 'react';

import { GLOBALS_KEY, PARAMETER_KEY } from '../../constants';
import { getActiveLocale } from '../../utils/getActiveLocale';
import { validateConfig } from '../../utils/validateConfig';
import { Panel } from '../components/Panel';
import { Warning } from '../components/Warning';
import { LocaleButton } from '../components/LocaleButton';

function LocalePanel() {
    const intlConfig = useParameter(PARAMETER_KEY);
    const error = validateConfig(intlConfig);

    const [globals, updateGlobals] = useGlobals();
    const intlGlobals = globals[GLOBALS_KEY];

    const locales = intlConfig?.locales ?? [];
    const activeLocale = getActiveLocale(
        locales,
        intlGlobals?.activeLocale,
        intlConfig?.defaultLocale
    );

    const changeLocale = (nextActiveLocale) => {
        updateGlobals({
            [GLOBALS_KEY]: {
                activeLocale: nextActiveLocale
            }
        });
    };

    if (!!error) {
        <Warning>
            {error === 'missing' ? (
                <Fragment>
                    <pre>storybook-addon-intl</pre> is not configured.
                </Fragment>
            ) : (
                <Fragment>
                    <pre>storybook-addon-intl</pre> is not configured correctly.
                </Fragment>
            )}
        </Warning>;
    }

    return (
        <Panel>
            {locales.map((locale) => {
                const handleClick = () => {
                    changeLocale(locale);
                };

                return (
                    <LocaleButton
                        key={locale}
                        active={locale === activeLocale}
                        onClick={handleClick}
                    >
                        {locale}
                    </LocaleButton>
                );
            })}
        </Panel>
    );
}

export default LocalePanel;
