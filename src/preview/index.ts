import type { Preview } from '@storybook/react';
import { GLOBALS_KEY, PARAMETER_KEY } from '../constants';
import { withIntl } from './decorators/withIntl';

const preview: Preview = {
    decorators: [withIntl],
    parameters: {
        [PARAMETER_KEY]: null
    },
    initialGlobals: {
        [GLOBALS_KEY]: {
            activeLocale: null
        }
    }
};

export default preview;
