import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['storybook-addon-intl'],
    framework: {
        name: '@storybook/react-vite',
        options: {}
    },
    docs: {
        autodocs: 'tag'
    }
};

export default config;
