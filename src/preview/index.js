import { GLOBALS_KEY, PARAMETER_KEY } from '../constants';
import { withIntl } from './decorators/withIntl';

/**
 * @type {import('@storybook/types').ProjectAnnotations<import('@storybook/types').Renderer>}
 */
const preview = {
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
