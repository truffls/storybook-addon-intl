import { defineConfig, type Options } from 'tsup';
import { readFile } from 'fs/promises';
import { globalPackages as globalManagerPackages } from '@storybook/manager/globals';
import { globalPackages as globalPreviewPackages } from '@storybook/preview/globals';

const BROWSER_TARGET: Options['target'] = [
    'chrome100',
    'safari15',
    'firefox91'
];
const NODE_TARGET: Options['target'] = ['node18'];

type BundlerConfig = {
    bundler?: {
        exportEntry?: string;
        nodeEntry?: string;
        managerEntry?: string;
        previewEntry?: string;
    };
};

export default defineConfig(async (options) => {
    // reading the three types of entries from package.json, which has the following structure:
    // {
    //  ...
    //   "bundler": {
    //     "exportEntry": "./src/index.ts",
    //     "managerEntry": "./src/manager.ts",
    //     "previewEntry": "./src/preview.ts"
    //     "nodeEntry": "./src/preset.ts"
    //   }
    // }
    const packageJson = (await readFile('./package.json', 'utf8').then(
        JSON.parse
    )) as BundlerConfig;
    const {
        bundler: { exportEntry, managerEntry, previewEntry, nodeEntry } = {}
    } = packageJson;

    const commonConfig: Options = {
        splitting: false,
        minify: !options.watch,
        treeshake: true,
        sourcemap: true,
        clean: true
    };

    const configs: Options[] = [];

    // export entries are entries meant to be manually imported by the user
    // they are not meant to be loaded by the manager or preview
    // they'll be usable in both node and browser environments, depending on which features and modules they depend on
    if (!!exportEntry) {
        configs.push({
            ...commonConfig,
            entry: {
                index: exportEntry
            },
            dts: {
                resolve: true
            },
            format: ['esm', 'cjs'],
            target: [...BROWSER_TARGET, ...NODE_TARGET],
            platform: 'neutral',
            external: [...globalManagerPackages, ...globalPreviewPackages]
        });
    }

    // manager entries are entries meant to be loaded into the manager UI
    // they'll have manager-specific packages externalized and they won't be usable in node
    // they won't have types generated for them as they're usually loaded automatically by Storybook
    if (!!managerEntry) {
        configs.push({
            ...commonConfig,

            entry: {
                manager: managerEntry
            },
            format: ['esm'],
            target: BROWSER_TARGET,
            platform: 'browser',
            external: globalManagerPackages
        });
    }

    // preview entries are entries meant to be loaded into the preview iframe
    // they'll have preview-specific packages externalized and they won't be usable in node
    // they'll have types generated for them so they can be imported when setting up Portable Stories
    if (!!previewEntry) {
        configs.push({
            ...commonConfig,
            entry: {
                preview: previewEntry
            },
            dts: {
                resolve: true
            },
            format: ['esm', 'cjs'],
            target: BROWSER_TARGET,
            platform: 'browser',
            external: globalPreviewPackages
        });
    }

    // node entries are entries meant to be used in node-only
    // this is useful for presets, which are loaded by Storybook when setting up configurations
    // they won't have types generated for them as they're usually loaded automatically by Storybook
    if (!!nodeEntry) {
        configs.push({
            ...commonConfig,
            entry: {
                preset: nodeEntry
            },
            format: ['cjs'],
            target: NODE_TARGET,
            platform: 'node'
        });
    }

    return configs;
});
