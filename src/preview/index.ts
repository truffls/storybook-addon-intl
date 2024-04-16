import type { Renderer, ProjectAnnotations } from '@storybook/types';
import { GLOBALS_KEY, PARAMETER_KEY } from '../constants';
import { withIntl } from './decorators/withIntl';
import { ReactRenderer } from '@storybook/react';

const preview: ProjectAnnotations<ReactRenderer> = {
    decorators: [withIntl],
    parameters: {
        [PARAMETER_KEY]: null
    },
    globals: {
        [GLOBALS_KEY]: {
            activeLocale: null
        }
    }
};

export default preview;
