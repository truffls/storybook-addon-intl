const sh = require('shelljs');
sh.rm('-rf', 'dist');
sh.exec('babel src --ignore __tests__ --out-dir dist');
