import React from 'react';
import { FormattedMessage } from 'react-intl';
import { defaultLocales } from '../preview';

const meta = {
    title: 'Example/01 Message'
};

const messagesRichText = {
    en: {
        message:
            'Something <strong>important</strong>.<br></br>Something <underline>underlined</underline>.'
    },
    es: {
        message:
            'Algo <strong>importante</strong>.<br></br>Algo <underline>subrayado</underline>.'
    }
};

const getMessages = (locale) => messagesRichText[locale];

export default meta;

export const Default = () => {
    return <FormattedMessage id="message" />;
};

export const PerStory = Default.bind(null);
PerStory.parameters = {
    intl: {
        locales: [...defaultLocales, 'es']
    }
};

export const RichTextElements = Default.bind(null);
RichTextElements.parameters = {
    intl: {
        locales: ['en', 'es'],
        getMessages,
        defaultRichTextElements: {
            br: () => <br />,
            strong: (text) => <strong>{text}</strong>,
            underline: (text) => (
                <span style={{ textDecoration: 'underline' }}>{text}</span>
            )
        }
    }
};
