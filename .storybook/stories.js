import React from 'react';
import { storiesOf } from '@storybook/react';
import { FormattedMessage, FormattedDate } from 'react-intl';

storiesOf('Button', module)
    .add('Default', () => (
        <button>
            <FormattedMessage id="button.label" />
        </button>
    ));

storiesOf('Date', module)
    .add('With localized formats', () => (
        <p>
            <FormattedDate value={new Date(1459832991883)} format="custom"/>
        </p>
    ));
