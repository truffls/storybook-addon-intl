import { StoryObj } from '@storybook/react';
import React from 'react';
import { FormattedDate } from 'react-intl';

const meta = {
    title: 'Example/02 Date'
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        return (
            <FormattedDate value={new Date(1459832991883)} format="custom" />
        );
    }
};
