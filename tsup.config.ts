import { defineConfig, type Options } from 'tsup';

export default defineConfig(async () => {
    const packageJson = (
        await import('./package.json', { with: { type: 'json' } })
    ).default;

    const {
        bundler: { managerEntries = [], previewEntries = [] }
    } = packageJson;

    const commonConfig: Options = {
        // tsup's clean breaks watch mode (egoist/tsup#1270), the prebuild script wipes dist instead
        clean: false,
        format: ['esm'],
        treeshake: true,
        splitting: true,
        // provided by Storybook, never bundle them
        external: ['react', 'react-dom', '@storybook/icons']
    };

    const configs: Options[] = [];

    if (managerEntries.length) {
        configs.push({
            ...commonConfig,
            entry: managerEntries,
            platform: 'browser',
            // Storybook bundles manager entries again
            target: 'esnext'
        });
    }

    if (previewEntries.length) {
        configs.push({
            ...commonConfig,
            entry: previewEntries,
            platform: 'browser',
            // the user's builder bundles preview entries again
            target: 'esnext',
            dts: true
        });
    }

    return configs;
});
