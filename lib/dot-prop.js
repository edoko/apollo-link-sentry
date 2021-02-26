'use strict';
var isObj = require('is-obj');
var disallowedKeys = new Set(['__proto__', 'prototype', 'constructor']);
var isValidPath = function isValidPath(pathSegments) {
    return !pathSegments.some(function (segment) {
        return disallowedKeys.has(segment);
    });
};
function getPathSegments(path) {
    var pathArray = path.split('.');
    var parts = [];
    for (var i = 0; i < pathArray.length; i++) {
        var p = pathArray[i];
        while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
            p = p.slice(0, -1) + '.';
            p += pathArray[++i];
        }
        parts.push(p);
    }
    if (!isValidPath(parts)) {
        return [];
    }
    return parts;
}
module.exports = {
    get: function get(object, path, value) {
        if (!isObj(object) || typeof path !== 'string') {
            return value === undefined ? object : value;
        }
        var pathArray = getPathSegments(path);
        if (pathArray.length === 0) {
            return;
        }
        for (var i = 0; i < pathArray.length; i++) {
            object = object[pathArray[i]];
            if (object === undefined || object === null) {
                if (i !== pathArray.length - 1) {
                    return value;
                }
                break;
            }
        }
        return object === undefined ? value : object;
    },
    set: function set(object, path, value) {
        if (!isObj(object) || typeof path !== 'string') {
            return object;
        }
        var root = object;
        var pathArray = getPathSegments(path);
        for (var i = 0; i < pathArray.length; i++) {
            var p = pathArray[i];
            if (!isObj(object[p])) {
                object[p] = {};
            }
            if (i === pathArray.length - 1) {
                object[p] = value;
            }
            object = object[p];
        }
        return root;
    },
    delete: function _delete(object, path) {
        if (!isObj(object) || typeof path !== 'string') {
            return false;
        }
        var pathArray = getPathSegments(path);
        for (var i = 0; i < pathArray.length; i++) {
            var p = pathArray[i];
            if (i === pathArray.length - 1) {
                delete object[p];
                return true;
            }
            object = object[p];
            if (!isObj(object)) {
                return false;
            }
        }
    },
    has: function has(object, path) {
        if (!isObj(object) || typeof path !== 'string') {
            return false;
        }
        var pathArray = getPathSegments(path);
        if (pathArray.length === 0) {
            return false;
        }
        for (var i = 0; i < pathArray.length; i++) {
            if (isObj(object)) {
                if (!(pathArray[i] in object)) {
                    return false;
                }
                object = object[pathArray[i]];
            }
            else {
                return false;
            }
        }
        return true;
    },
};
//# sourceMappingURL=dot-prop.js.map