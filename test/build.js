var transpiler = require('es6-module-transpiler');
var Container = transpiler.Container;
var PackageResolver = require('../index.js');
var Path = require('path');

var container = new Container({
  resolvers: [new PackageResolver([Path.join(process.cwd(), 'packages')])],
  formatter: new transpiler.formatters.bundle()
});

container.getModule('app');
container.write(process.argv[2]);
