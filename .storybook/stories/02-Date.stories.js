import React from 'react';
import { FormattedDate } from 'react-intl';

const meta = {
    title: 'Example/02 Date'
};

export default meta;

export const Default = () => {
    return <FormattedDate value={new Date(1459832991883)} format="custom" />;
};
