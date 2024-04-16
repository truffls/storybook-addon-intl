import { StoryObj } from '@storybook/react';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const meta = {
    title: 'Example/01 Message',
    render: () => {
        return <FormattedMessage id="message" />;
    }
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PerStory: Story = {
    parameters: {
        intl: {
            locales: ['en', 'de', 'es']
        }
    }
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
} as Record<string, any>;

const getMessages = (locale: string) => messagesRichText[locale];

export const RichTextElements: Story = {
    parameters: {
        intl: {
            locales: ['en', 'es'],
            getMessages,
            defaultRichTextElements: {
                br: () => <br />,
                strong: (text: any) => <strong>{text}</strong>,
                underline: (text: any) => (
                    <span style={{ textDecoration: 'underline' }}>{text}</span>
                )
            }
        }
    }
};
