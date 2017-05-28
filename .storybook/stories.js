import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { FormattedMessage } from 'react-intl';

storiesOf('Button', module)
    .add('Default', () => (
        <button>
            <FormattedMessage id="button.label" />
        </button>
    ));
