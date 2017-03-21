# Package Resolver

[![Greenkeeper badge](https://badges.greenkeeper.io/eventualbuddha/es6-module-transpiler-package-resolver.svg)](https://greenkeeper.io/)

This resolver is intended to work with the [ES6 Module Transpiler][es6-module-transpiler] to provide file resolution for
projects written using the "package" style, e.g.

```
packages/
  utils/
    lib/
      string.js
      main.js
  app/
    lib/
      main.js
```

Given this package structure and the "packages" directory as a root, "utils/string" would be resolved to
"utils/lib/string.js", "app" would be resolved to "app/lib/main.js", etc. This project format is used by
[Ember.js][emberjs].

## Install

```
$ npm install [--save-dev] es6-module-transpiler-package-resolver
```

## Usage

When used directly with the ES6 Module Transpiler, just use it the same way you would `FileResolver` but give it all
your "packages" directories:

```js
var PackageResolver = require('es6-module-transpiler-package-resolver');
var Container = require('es6-module-transpiler').Container;
var BundleFormatter = require('es6-module-transpiler').formatters.bundle;

var container = new Container({
  formatter: new BundleFormatter(),
  resolvers: [new PackageResolver(['./packages'])
});
```

You can also use it with tools like [Broccoli][broccoli] via plugins such as
[broccoli-compile-modules][broccoli-compile-modules]:

```js
// Brocfile.js

var PackageResolver = require('es6-module-transpiler-package-resolver');
var compileModules = require('broccoli-compile-modules');

module.exports = compileModules('packages', {
  inputFiles: ['app'],
  resolvers: [PackageResolver],
  formatter: 'bundle'
});
```

## Contributing

1. Fork this project.
1. Create a branch for your bug fix or feature.
1. Commit to that branch, ensuring you update and add tests as appropriate.
1. Submit a pull request with a description of the bug or feature, links to any relevant resources, etc.

Thanks!

[broccoli]: https://github.com/broccolijs/broccoli
[broccoli-compile-modules]: https://github.com/eventualbuddha/broccoli-compile-modules
[emberjs]: https://github.com/emberjs/ember.js
[es6-module-transpiler]: https://github.com/esnext/es6-module-transpiler
