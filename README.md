# Intl Addon [![Build Status](https://travis-ci.org/truffls/storybook-addon-intl.svg?branch=master)](https://travis-ci.org/truffls/storybook-addon-intl)

The Intl addon can be used to provide locale switcher and react-intl.

![](docs/screenshot.png)

## Getting Started

First, install the addon

```shell
npm install -D storybook-addon-intl
```

_Note: Following peer dependencies are required: `@storybook/addons`, `@storybook/react`, `react` and `react-intl`._

Add this line to your `addons.js` file (create this file inside your storybook config directory if needed).

```js
import 'storybook-addon-intl/register';
```

In your `config.js` import the `setIntlConfig` and `withIntl` function. Use `setIntlConfig` to set the configuration
for `react-intl` and `withIntl´ as decorator.

```js
import { addDecorator, configure } from '@storybook/react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';

// Load the locale data for all your defined locales
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import deLocaleData from 'react-intl/locale-data/de';

addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

// Provide your messages
const messages = {
    'en': { 'button.label': 'Click me!' },
    'de': { 'button.label': 'Klick mich!' }
};

// Provide your formats (optional)
const formats = {
    'en': {
            'date': {
                'year-only': {
                    'year': '2-digit',
                },
            },
        },
    'de': {
            'date': {
                'year-only': {
                    'year': 'numeric',
                },
            },
        },
};

const getMessages = (locale) => messages[locale];
const getFormats = (locale) => formats[locale];

// Set intl configuration
setIntlConfig({
    locales: ['en', 'de'],
    defaultLocale: 'en',
    getMessages,
    getFormats,
});

// Register decorator
addDecorator(withIntl);


// Run storybook
configure(() => require('./stories'), module);
```

## Troubleshooting

##### _Accessing nonexistent addons channel_ error:
This error can be caused by multiple conflicting versions of `@storybook/addons` in your app.

-   Ensure that the entries starting with `@storybook/addon-` in your `package.json` refer to the same and latest version.
-   Add the latest version of `@storybook/addons` to your app's `dependencies` and reinstall all modules.

If the above steps don't solve the issue, please read the [storybook documentation](https://storybook.js.org/basics/faq/#why-is-there-no-addons-channel) on this topic:
> Most of the time, the fix is deleting the node_modules folder with any package-lock.json or yarn.lock and reinstalling.

## upgrade storybook 5、6

Add this line to your `main.js` file (create this file inside your storybook config directory if needed).

```js
module.exports = {
  addons: [
    "storybook-addon-intl"
  ]
};
```

In your `preview.js` import the `setIntlConfig` and `withIntl` function. Use `setIntlConfig` to set the configuration
for `react-intl` and `withIntl´ as decorator.

```javascript
import { addDecorator } from "@storybook/react";
import { setIntlConfig, withIntl } from "storybook-addon-intl";

const locales = ["en-US", "zh-CN", "zh-TW"];

// Provide your messages, or you can import local locale messages files.
const messages = {
  'en': { 'button.label': 'Click me!' },
  'de': { 'button.label': 'Klick mich!' }
};
// Set intl configuration
setIntlConfig({
  defaultLocale: "en",
  locales,
  getMessages: locale => messages[locale],
});

// Register decorator
addDecorator(withIntl);
```

### support older browsers
If you want to support older browsers, you can view the documentation [Intl](https://github.com/andyearnshaw/Intl.js).
