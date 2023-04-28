export default {
    stories: ['./stories/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['./local-preset.js'],
    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    }
};
