import React from 'react';
import { Panel } from './Panel';
import { LocaleButton } from './LocaleButton';

export type LocalePanelContentProps = {
    locales: string[];
    activeLocale: string;
    onChangeLocale: (nextActiveLocale: string) => void;
};

export function LocalePanelContent({
    locales,
    activeLocale,
    onChangeLocale
}: LocalePanelContentProps) {
    return (
        <Panel>
            {locales.map((locale) => {
                const handleClick = () => {
                    onChangeLocale(locale);
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
