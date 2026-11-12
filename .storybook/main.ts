import { defineMain } from '@storybook/react-vite/node';

export default defineMain({
    stories: ['../src/stories/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['storybook-addon-intl'],
    framework: '@storybook/react-vite'
});
