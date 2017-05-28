#!/usr/bin/env node
const sh = require('shelljs');
const pkg = require('../package.json');

const packagesToInstall = Object.keys(pkg.peerDependencies).reduce((accu, depName) => {
    const depVersion = pkg.peerDependencies[depName];

    accu.push(`${depName}@${depVersion}`);

    return accu;
}, []);

sh.exec(`npm install ${packagesToInstall.join(' ')}`);
