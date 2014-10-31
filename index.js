/**
 * Use this to compile projects using a "package" structure using the
 * es6-module-transpiler, either from the command-line or via a library.
 */

var Path = require('path');

var transpiler = require('es6-module-transpiler');
var FileResolver = transpiler.FileResolver;
var utils = require('es6-module-transpiler/lib/utils');

/**
 * Provides resolution of absolute paths from module import sources in projects
 * using the "package" structure, that is one that looks like this:
 *
 *   packages/
 *     utils/
 *       lib/
 *         string.js
 *         map.js
 *       main.js
 *     app
 *       main.js
 *
 * @constructor
 * @extends FileResolver
 */
function PackageResolver(paths) {
  FileResolver.call(this, paths);
}
utils.extend(PackageResolver, FileResolver);

/**
 * Resolves the raw imported path relative to the given module to a real file
 * system path, e.g.
 *
 *   ```js
 *   import Map from 'utils/map';     // packages/utils/lib/map.js
 *   import * as utils from 'utils';  // packages/utils/main.js
 *   ```
 *
 * @param {string} importedPath
 * @param {?Module} fromModule
 * @return {string}
 */
PackageResolver.prototype.resolvePath = function(importedPath, fromModule) {
  var $super = FileResolver.prototype.resolvePath;
  var result = $super.call(this, importedPath, fromModule);

  if (!result) {
    var match = importedPath.match(/^([^\/]+)\/(.+)$/);
    var path = match ?
      Path.join(match[1], 'lib', match[2]) :
      Path.join(importedPath, 'lib/main');
    result = $super.call(this, path, fromModule);
  }

  return result;
};

module.exports = PackageResolver;
