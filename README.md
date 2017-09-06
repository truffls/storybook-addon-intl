# Intl Addon [![Build Status](https://travis-ci.org/truffls/storybook-addon-intl.svg?branch=master)](https://travis-ci.org/truffls/storybook-addon-intl)

The Intl addon can be used to provide locale switcher and react-intl.

![](docs/screenshot.png)

## Getting Started

First, install the addon

```shell
npm install -D storybook-addon-intl
```

_Note: Following peer dependencies are required: `@storybook/react`, `react` and `react-intl`._

Add this line to your `addons.js` file (create this file inside your storybook config directory if needed).

```js
import 'storybook-addon-intl/register';
```

In your `config.js` import the `setIntlConfig` and `withIntl` function. Use `setIntlConfig` to set the configuration
for `react-intl` and `withIntl´ as decorator.

```js
import { addDecorator, configure } from '@storybook/react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl/dist/preview';

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

const getMessages = (locale) => messages[locale];

// Set intl configuration
setIntlConfig({
    locales: ['en', 'de'],
    defaultLocale: 'en',
    getMessages
});

// Register decorator
addDecorator(withIntl);


// Run storybook
configure(() => require('./stories'), module);
```
