import type { FormatXMLElementFn } from 'intl-messageformat';
import type { ReactNode } from 'react';
import type { CustomFormats, MessageFormatElement } from 'react-intl';

type MessageIds = FormatjsIntl.Message extends {
    ids: infer T;
}
    ? T extends string
        ? T
        : string
    : string;

export type StorybookAddonIntlConfigCommon = {
    locales: string[];
    defaultLocale: string;
};

export type StorybookAddonIntlConfig = StorybookAddonIntlConfigCommon & {
    getMessages: (
        locale: string
    ) =>
        | Record<MessageIds, string>
        | Record<MessageIds, MessageFormatElement[]>;
    getFormats: (locale: string) => CustomFormats;
    defaultRichTextElements?: Record<string, FormatXMLElementFn<ReactNode>>;
};

export type StorybookAddonIntlState = {
    activeLocale: string | null;
};
