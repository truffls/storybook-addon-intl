// Type definitions for storybook-addon-intl 2.3
// Project: https://github.com/truffls/storybook-addon-intl#readme
// Definitions by: 9renpoto <https://github.com/9renpoto>
// Definitions: https://github.com/truffls/storybook-addon-intl

import { RenderFunction, Renderable } from "@storybook/react";

export function register(): undefined;

export type WithIntlProps = {
    locale?: string,
    formats?: object,
    messages?: object,
    textComponent?: any,
    defaultLocale?: string,
    initialNow?: any,
    defaultFormats?: object
}

export interface Config extends WithIntlProps {
    locales: string[]
    getMessages: (locale: string) => string
}

export function setIntlConfig(config: Config): undefined;

export function withIntl(
    story: RenderFunction,
    context: { kind: string; story: string }
): Renderable | null;
